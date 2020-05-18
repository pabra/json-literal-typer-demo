import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { js_beautify as jsBeautify } from 'js-beautify';
import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import beautifyOptions from '../lib/beautifyOptions';
import store from '../lib/store';
import styles from './JsonInput.module.scss';

const defaultContent = `{ "stations": [
    { "id": 1, "name": "station A", "status": "OPEN", "attributes": ["fast"] },
    { "id": 2, "name": "station B", "status": "OPEN", "attributes": ["fast", "24/7"], "operator": "Station Corp." },
    { "id": 3, "name": "station C", "status": "CLOSED", "attributes": [], "operator": "ACME Inc." }
  ]}`;

const JsonInput = () => {
  const [inputValue, setInputValue] = useState(defaultContent);
  const [jsonError, setJsonError] = useState('');
  const [, setJsonString] = store.useJsonString();
  const trimmedInput = inputValue.trim();
  const isValid: null | boolean =
    trimmedInput === '' ? null : jsonError === '' ? true : false;
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
    <div className="flex-column content-box">
      <h2 className="align-center">JSON input</h2>
      <CodeMirror
        value={inputValue}
        className="auto-overflow flex-1"
        onBeforeChange={(_editor, _data, value) => setInputValue(value)}
        options={{
          mode: 'application/json',
          lineNumbers: true,
          spellcheck: false,
          viewportMargin: Infinity,
        }}
      />
      <div className={styles.status}>
        {isValid === true && <button onClick={handleBeautify}>beautify</button>}
        {jsonError && <code>{jsonError}</code>}
      </div>
    </div>
  );
};

export default JsonInput;
