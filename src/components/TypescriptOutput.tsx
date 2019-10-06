import React from 'react';
import { js_beautify as jsBeautify } from 'js-beautify';

import store from '../lib/store';
import beautifyOptions from '../lib/beautifyOptions';
import styles from './TypescriptOutput.module.scss';

const TypescriptOutput = () => {
  const [typescriptStr] = store.useTypesciptString();
  const beauty = jsBeautify(typescriptStr, beautifyOptions);
  const spaced = beauty
    .replace(/(\r?\n)((?:interface|type) )/g, '$1$1$2')
    .replace(/(\w) \? : /g, '$1?: ');

  return (
    <div className={styles.root}>
      <h3>TypeScript types output</h3>
      <textarea
        value={spaced}
        className={`code ${styles.typescriptOutput}`}
        readOnly
      ></textarea>
    </div>
  );
};

export default TypescriptOutput;
