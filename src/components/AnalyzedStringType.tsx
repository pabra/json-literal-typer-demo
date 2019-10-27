import React, { useState } from 'react';
import { StringObject } from 'json-literal-typer/lib/analyze';

import TypeBoxTitle from './TypeBoxTitle';
import Values from './Values';
import store from '../lib/store';

interface Props {
  evenOdd?: 'even' | 'odd';
  analyzedObject: StringObject;
}

const AnalyzedStringType: React.FC<Props> = ({
  analyzedObject,
  evenOdd = 'even',
}: Props) => {
  const [, setConfig] = store.useConfig();
  const [showBaseType, setShowBaseType] = useState(false);
  const [forceOwnType, setForceOwnType] = useState(false);
  const valuesObject = {
    type: analyzedObject.type,
    values: analyzedObject.values,
  };
  const toggleShowBaseType = (state: boolean) => {
    const newState = !state;
    setConfig({ path: analyzedObject.path, config: { baseType: newState } });

    return newState;
  };
  const toggleForceOwnType = (state: boolean) => {
    const newState = !state;
    setConfig({ path: analyzedObject.path, config: { forceType: newState } });

    return newState;
  };

  return (
    <div className={`string data-tree-box ${evenOdd}`}>
      <TypeBoxTitle type={analyzedObject.type} name={analyzedObject.name} />
      <div>
        <label>
          <input
            type="checkbox"
            checked={showBaseType}
            onChange={() => setShowBaseType(toggleShowBaseType)}
          />
          <span>show base type</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={forceOwnType}
            onChange={() => setForceOwnType(toggleForceOwnType)}
          />
          <span>force own type</span>
        </label>
      </div>
      <Values values={valuesObject} />
    </div>
  );
};

export default AnalyzedStringType;
