import React, { useState } from 'react';
import { ObjectObject } from 'json-literal-typer/lib/analyze';

import AnalyzedValuesByType from './AnalyzedValuesByType';
import TypeBoxTitle from './TypeBoxTitle';
import styles from './AnalyzedObjectType.module.css';
import store from '../lib/store';

interface Props {
  evenOdd?: 'even' | 'odd';
  analyzedObject: ObjectObject;
}

const AnalyzedObjectType: React.FC<Props> = ({
  analyzedObject,
  evenOdd = 'even',
}: Props) => {
  const [, setConfig] = store.useConfig();
  const [forceOwnType, setForceOwnType] = useState(true);
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
  const isRootObject = analyzedObject.parent === null;

  return (
    <div
      className={`object data-tree-box ${className}`}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    >
      <TypeBoxTitle type={analyzedObject.type} name={analyzedObject.name} />
      <div>
        {!isRootObject && (
          <label>
            <input
              type="checkbox"
              checked={forceOwnType}
              onChange={() => setForceOwnType(toggleForceOwnType)}
            />
            <span>force own type</span>
          </label>
        )}
      </div>
      {Object.entries(analyzedObject.keys)
        .sort()
        .map(([key, { optional, values }]) => (
          <div key={key}>
            <div>
              .{key}
              {optional ? '?' : ''}
            </div>
            <div
              onMouseEnter={() => setHighlight(false)}
              onMouseLeave={() => setHighlight(true)}
            >
              <AnalyzedValuesByType valuesByType={values} evenOdd={evenOdd} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnalyzedObjectType;
