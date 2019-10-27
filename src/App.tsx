import React from 'react';

import JsonInput from './components/JsonInput';
import JsonToTypescript from './components/JsonToTypescript';
import TypescriptOutput from './components/TypescriptOutput';
import TypeRepresentation from './components/TypeRepresentation';
import ConfigEdit from './components/ConfigEdit';
import Footer from './components/Footer';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <JsonToTypescript />
      <div className={`align-center ${styles.head}`}>
        <h1>JSON literal typer</h1>
      </div>
      <div className="flex-row equal flex-1">
        <div className="flex-column equal">
          <JsonInput />
          <ConfigEdit />
        </div>
        <div className="flex-column equal">
          <TypescriptOutput />
          <TypeRepresentation />
        </div>
      </div>
      <div className={`align-center ${styles.foot}`}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
