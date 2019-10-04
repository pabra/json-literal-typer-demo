import { useEffect } from 'react';
import analyze, { typify } from 'json-literal-typer';

import store from '../lib/store';

const JsonToTypescript = () => {
  const [jsonString] = store.useJsonString();
  const [, setTypescriptString] = store.useTypesciptString();

  useEffect(() => {
    if (!jsonString) {
      setTypescriptString('');
      return;
    }

    const analyzed = analyze(JSON.parse(jsonString));
    const typified = typify(analyzed);
    setTypescriptString(typified);
  }, [jsonString, setTypescriptString]);

  return null;
};

export default JsonToTypescript;
