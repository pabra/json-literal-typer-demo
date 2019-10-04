/* eslint @typescript-eslint/no-var-requires: 0, no-console: 0 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const which = require('which');

const compressables = [
  '.html',
  '.md',
  '.js',
  '.css',
  '.map',
  '.svg',
  '.ttf',
  '.eot',
  '.json',
  '.webapp',
];

const compressionJobs = [];
let dirsToRead = 0;
let filesToStat = 0;
let runningJobs = 0;

const requiredBins = { gz: ['zopfli'], br: ['brotli'] };

const binPaths = {
  ...Object.entries(requiredBins).reduce((acc, [name, bins]) => {
    let path = null;

    bins.some(bin => {
      const res = which.sync(bin, { nothrow: true });
      if (res === null) {
        return false;
      }
      path = res;
      return true;
    });

    if (path === null) {
      throw new Error(`no path for binary '${name}'`);
    }

    acc[name] = path;

    return acc;
  }, {}),
};

console.log('binPaths', binPaths); // TODO: remove DEBUG

const setFileTimes = (filePath, stats, cb) => {
  fs.utimes(filePath, stats.atimeMs / 1000, stats.mtimeMs / 1000, cb);
};

const runNextJob = () => {
  if (compressionJobs.length === 0 || runningJobs >= 2) {
    return;
  }

  runningJobs += 1;
  const { job, stats } = compressionJobs.shift();
  job(outPath => {
    setFileTimes(outPath, stats, () => {
      runningJobs -= 1;
      console.log(
        `${compressionJobs.length +
          runningJobs} jobs left - finished ${outPath}`,
      );

      runNextJob();
    });
  });
  runNextJob();
};

const sortJobs = () => {
  compressionJobs.sort((a, b) => b.stats.size - a.stats.size);
};

const readdirHandler = (err, entries, dir) => {
  if (err) {
    throw err;
  }

  entries.forEach(entry => {
    const inPath = path.resolve(path.join(dir, entry.name));

    if (entry.isDirectory()) {
      readdir(inPath); // eslint-disable-line
    } else if (entry.isFile()) {
      if (compressables.includes(path.extname(entry.name))) {
        filesToStat += 1;
        fs.stat(inPath, (err, stats) => {
          if (err) {
            throw err;
          }
          if (stats.size > 512) {
            compressionJobs.push({
              job: cb => {
                const outPath = `${inPath}.gz`;
                const writeStream = fs
                  .createWriteStream(outPath, {
                    mode: stats.mode,
                  })
                  .on('finish', () => {
                    cb(outPath);
                  });

                const proc = spawn(binPaths.gz, ['--gzip', '-c', inPath], {
                  stdio: ['ignore', 'pipe', 'pipe'],
                });

                proc.stdout.pipe(writeStream);
                proc.stderr.on('data', data => {
                  console.error('ERROR:', data);
                  throw new Error(data);
                });
              },
              inPath,
              stats,
            });

            compressionJobs.push({
              job: cb => {
                const outPath = `${inPath}.br`;
                const writeStream = fs
                  .createWriteStream(outPath, {
                    mode: stats.mode,
                  })
                  .on('finish', () => {
                    cb(outPath);
                  });

                const proc = spawn(
                  binPaths.br,
                  ['--keep', '--force', '-c', inPath],
                  {
                    stdio: ['ignore', 'pipe', 'pipe'],
                  },
                );

                proc.stdout.pipe(writeStream);
                proc.stderr.on('data', data => {
                  console.error('ERROR:', data);
                  throw new Error(data);
                });
              },
              inPath,
              stats,
            });
          }
          filesToStat -= 1;
          if (dirsToRead === 0 && filesToStat === 0) {
            sortJobs();
            runNextJob();
          }
        });
      }
    }
  });

  // if (isRunning === false) {
  //   compress();
  // }
};

const readdir = dir => {
  dirsToRead += 1;
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    readdirHandler(err, files, dir);
    dirsToRead -= 1;
    if (dirsToRead === 0 && filesToStat === 0) {
      sortJobs();
      runNextJob();
    }
  });
};

readdir('./build');
