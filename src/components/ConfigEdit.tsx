import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import store from '../lib/store';

const ConfigEdit = () => {
  const [config] = store.useConfig();
  const configStr = JSON.stringify(config, null, 2);

  return (
    <div className="flex-column content-box">
      <h2 className="align-center">generated config</h2>
      <CodeMirror
        className="auto-overflow flex-1"
        value={configStr}
        onBeforeChange={() => {}}
        options={{ mode: 'text/typescript', readOnly: true }}
      />
    </div>
  );
};

export default ConfigEdit;
