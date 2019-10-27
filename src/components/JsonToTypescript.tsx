import { useEffect } from 'react';
import analyze, { typify } from 'json-literal-typer';

import store from '../lib/store';

const JsonToTypescript = () => {
  const [jsonString] = store.useJsonString();
  const [config] = store.useConfig();
  const [, setTypescriptString] = store.useTypesciptString();
  const [, setAnalyzedData] = store.useAnalyzedData();

  useEffect(() => {
    if (!jsonString) {
      setTypescriptString('');
      setAnalyzedData(null);
      return;
    }

    const analyzed = analyze(JSON.parse(jsonString));
    const typified = typify(analyzed, config);
    setTypescriptString(typified);
    setAnalyzedData(analyzed);
  }, [jsonString, setTypescriptString, setAnalyzedData, config]);

  return null;
};

export default JsonToTypescript;
