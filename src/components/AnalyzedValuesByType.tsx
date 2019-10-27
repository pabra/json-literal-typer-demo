import React from 'react';
import { ValuesByType } from 'json-literal-typer/lib/analyze';

import AnalyzedType from './AnalyzedType';

interface Props {
  evenOdd?: 'even' | 'odd';
  valuesByType: ValuesByType;
}

const AnalyzedValuesByType: React.FC<Props> = ({
  valuesByType,
  evenOdd = 'even',
}: Props) => {
  return (
    <div>
      {Object.keys(valuesByType)
        .sort()
        .map(valueType => {
          const value = valuesByType[valueType as keyof ValuesByType];

          return value === undefined ? null : (
            <AnalyzedType
              key={valueType}
              evenOdd={evenOdd === 'even' ? 'odd' : 'even'}
              analyzedObject={value}
            />
          );
        })}
    </div>
  );
};

export default AnalyzedValuesByType;
