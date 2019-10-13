import React from 'react';

import JsonInput from './components/JsonInput';
import JsonToTypescript from './components/JsonToTypescript';
import TypescriptOutput from './components/TypescriptOutput';
import Footer from './components/Footer';
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
        <Footer />
      </div>
    </div>
  );
};

export default App;
