import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { js_beautify as jsBeautify } from 'js-beautify';
import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import beautifyOptions from '../lib/beautifyOptions';
import store from '../lib/store';

const TypescriptOutput = () => {
  const [typescriptStr] = store.useTypesciptString();
  const beauty = jsBeautify(typescriptStr, beautifyOptions);
  const spaced = beauty
    .replace(/(\r?\n)((?:interface|type) )/g, '$1$1$2')
    .replace(/(\w) \? : /g, '$1?: ');

  return (
    <div className="flex-column content-box">
      <h2 className="align-center">generated TypeScript</h2>
      <CodeMirror
        className="auto-overflow flex-1"
        value={spaced}
        onBeforeChange={() => {
          // noop
        }}
        options={{ mode: 'text/typescript', readOnly: true }}
      />
    </div>
  );
};

export default TypescriptOutput;
