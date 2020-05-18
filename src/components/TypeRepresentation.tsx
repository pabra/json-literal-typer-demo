import React from 'react';
import store from '../lib/store';
import AnalyzedType from './AnalyzedType';

const TypeRepresentation = () => {
  const [analyzedData] = store.useAnalyzedData();

  return (
    <div className="flex-column content-box">
      <h2 className="align-center">data tree representation</h2>
      <div className="auto-overflow">
        {analyzedData === null ? null : (
          <AnalyzedType analyzedObject={analyzedData} />
        )}
      </div>
    </div>
  );
};

export default TypeRepresentation;
