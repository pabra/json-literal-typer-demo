import typerPj from 'json-literal-typer/package.json';
import React from 'react';
import demoPJ from '../../package.json';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <div className={styles.root}>
    <div className={styles.box}>demo version: {demoPJ.version}</div>
    <div className={styles.box}>
      <a
        href={typerPj.repository.url.replace(/(:?^git\+)i?/, '')}
        target="_blank"
        rel="noopener noreferrer"
      >
        JSON-literal-typer version: {typerPj.version}
      </a>
    </div>
    <div className={styles.box}>
      source on{' '}
      <a href={demoPJ.homepage} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </div>
  </div>
);

export default Footer;
