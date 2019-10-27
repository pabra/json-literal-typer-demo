import React, { useState } from 'react';
import { NullObject } from 'json-literal-typer/lib/analyze';

import TypeBoxTitle from './TypeBoxTitle';
import Values from './Values';
import store from '../lib/store';

interface Props {
  evenOdd?: 'even' | 'odd';
  analyzedObject: NullObject;
}

const AnalyzedNullType: React.FC<Props> = ({
  analyzedObject,
  evenOdd = 'even',
}: Props) => {
  const [, setConfig] = store.useConfig();
  const [forceOwnType, setForceOwnType] = useState(false);
  const valuesObject = {
    type: analyzedObject.type,
    values: new Set([null]),
  };
  const toggleForceOwnType = (state: boolean) => {
    const newState = !state;
    setConfig({ path: analyzedObject.path, config: { forceType: newState } });

    return newState;
  };

  return (
    <div className={`null data-tree-box ${evenOdd}`}>
      <TypeBoxTitle type={analyzedObject.type} name={analyzedObject.name} />
      <div>
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

export default AnalyzedNullType;
