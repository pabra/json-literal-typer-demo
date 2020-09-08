import typerPj from 'json-literal-typer/package.json';
import React from 'react';
import demoPJ from '../../package.json';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <div className={styles.root}>
    <div className={styles.box}>
      demo version: {demoPJ.version} (source on{' '}
      <a
        href={demoPJ.repository.url.replace(/(:?^git\+)i?/, '')}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      )
    </div>
    <div className={styles.box}>
      JSON-literal-typer version: {typerPj.version} (source on{' '}
      <a
        href={typerPj.repository.url.replace(/(:?^git\+)i?/, '')}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      )
    </div>
  </div>
);

export default Footer;
