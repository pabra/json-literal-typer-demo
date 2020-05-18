import { NumberObject } from 'json-literal-typer/dist/esm/analyze';
import React, { useState } from 'react';
import store from '../lib/store';
import TypeBoxTitle from './TypeBoxTitle';
import Values from './Values';

interface Props {
  evenOdd?: 'even' | 'odd';
  analyzedObject: NumberObject;
}

const AnalyzedNumberType: React.FC<Props> = ({
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
    <div className={`number data-tree-box ${evenOdd}`}>
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

export default AnalyzedNumberType;
