import { ArrayObject } from 'json-literal-typer/dist/esm/analyze';
import React, { useState } from 'react';
import store from '../lib/store';
import styles from './AnalyzedArrayType.module.css';
import AnalyzedValuesByType from './AnalyzedValuesByType';
import TypeBoxTitle from './TypeBoxTitle';

interface Props {
  evenOdd?: 'even' | 'odd';
  analyzedObject: ArrayObject;
}

const AnalyzedArrayType: React.FC<Props> = ({
  analyzedObject,
  evenOdd = 'even',
}: Props) => {
  const [, setConfig] = store.useConfig();
  const [forceOwnType, setForceOwnType] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const classNames = [styles.root, evenOdd];
  const toggleForceOwnType = (state: boolean) => {
    const newState = !state;
    setConfig({ path: analyzedObject.path, config: { forceType: newState } });

    return newState;
  };

  if (highlight) {
    classNames.push('highlight');
  }

  const className = classNames.join(' ');

  return (
    <div
      className={`array data-tree-box ${className}`}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    >
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
      <div
        onMouseEnter={() => setHighlight(false)}
        onMouseLeave={() => setHighlight(true)}
      >
        <AnalyzedValuesByType
          valuesByType={analyzedObject.values}
          evenOdd={evenOdd}
        />
      </div>
    </div>
  );
};

export default AnalyzedArrayType;
