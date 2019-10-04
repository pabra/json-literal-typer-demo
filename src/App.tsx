import React from 'react';

import JsonInput from './components/JsonInput';
import JsonToTypescript from './components/JsonToTypescript';
import TypescriptOutput from './components/TypescriptOutput';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <JsonToTypescript />
      <div className={styles.head}>
        <h2>JSON literal typer</h2>
      </div>
      <div className={styles.code}>
        <JsonInput />
        <TypescriptOutput />
      </div>
      <div className={styles.foot}>
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
};

export default App;
