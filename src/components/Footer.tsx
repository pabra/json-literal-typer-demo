import React from 'react';
import typerPj from 'json-literal-typer/package.json';

import demoPJ from '../../package.json';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <div className={styles.root}>
    <div className={styles.box}>Demo Version: {demoPJ.version}</div>
    <div className={styles.box}>
      JSON-literal-typer Version: {typerPj.version}
    </div>
    <div className={styles.box}>
      source on{' '}
      <a
        href="https://github.com/pabra/json-literal-typer"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  </div>
);

export default Footer;
