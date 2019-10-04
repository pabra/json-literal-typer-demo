import React, { useState, useEffect } from 'react';
import { js_beautify as jsBeautify } from 'js-beautify';

import store from '../lib/store';
import beautifyOptions from '../lib/beautifyOptions';
import styles from './JsonInput.module.scss';

const defaultContent = `{ "stations": [
    { "id": 1, "name": "station A", "status": "OPEN", "attibutes": ["fast"] },
    { "id": 2, "name": "station B", "status": "OPEN", "attibutes": ["fast", "24/7"], "operator": "Station Corp." },
    { "id": 3, "name": "station C", "status": "CLOSED", "attibutes": [], "operator": "ACME Inc." }
  ]}`;

const JsonInput = () => {
  const [inputValue, setInputValue] = useState(defaultContent);
  const [jsonError, setJsonError] = useState('');
  const [, setJsonString] = store.useJsonString();
  const trimmedInput = inputValue.trim();
  const isValid: null | boolean =
    trimmedInput === '' ? null : jsonError === '' ? true : false;
  const jsonClassName = isValid === null ? '' : isValid ? 'valid' : 'invalid';
  const handleBeautify = () => {
    setInputValue(jsBeautify(inputValue, beautifyOptions));
  };

  useEffect(() => {
    if (trimmedInput === '') {
      setJsonError('');
      setJsonString('');
      return;
    }

    try {
      JSON.parse(trimmedInput);
      setJsonError('');
      setJsonString(trimmedInput);
    } catch (err) {
      setJsonError(String(err));
      setJsonString('');
    }
  }, [trimmedInput, setJsonString]);

  return (
    <div className={styles.root}>
      <h3>JSON input</h3>
      <textarea
        spellCheck={false}
        value={inputValue}
        className={`code ${jsonClassName} ${styles.jsonInput}`}
        onChange={ev => setInputValue(ev.target.value)}
      ></textarea>
      <div className={styles.status}>
        {isValid === true && <button onClick={handleBeautify}>beautify</button>}
        {jsonError && <code>{jsonError}</code>}
      </div>
    </div>
  );
};

export default JsonInput;
