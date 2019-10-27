import React from 'react';
import {
  NullObject,
  BooleanObject,
  NumberObject,
  StringObject,
  ArrayObject,
  ObjectObject,
} from 'json-literal-typer/lib/analyze';

import AnalyzedNullType from './AnalyzedNullType';
import AnalyzedBooleanType from './AnalyzedBooleanType';
import AnalyzedNumberType from './AnalyzedNumberType';
import AnalyzedStringType from './AnalyzedStringType';
import AnalyzedArrayType from './AnalyzedArrayType';
import AnalyzedObjectType from './AnalyzedObjectType';

interface Props {
  evenOdd?: 'even' | 'odd';
  analyzedObject:
    | NullObject
    | BooleanObject
    | NumberObject
    | StringObject
    | ArrayObject
    | ObjectObject;
}

const AnalyzedType: React.FC<Props> = ({
  analyzedObject,
  evenOdd = 'even',
}: Props) => {
  switch (analyzedObject.type) {
    case 'null':
      return (
        <AnalyzedNullType analyzedObject={analyzedObject} evenOdd={evenOdd} />
      );
    case 'boolean':
      return (
        <AnalyzedBooleanType
          analyzedObject={analyzedObject}
          evenOdd={evenOdd}
        />
      );
    case 'number':
      return (
        <AnalyzedNumberType analyzedObject={analyzedObject} evenOdd={evenOdd} />
      );
    case 'string':
      return (
        <AnalyzedStringType analyzedObject={analyzedObject} evenOdd={evenOdd} />
      );
    case 'array':
      return (
        <AnalyzedArrayType analyzedObject={analyzedObject} evenOdd={evenOdd} />
      );
    case 'object':
      return (
        <AnalyzedObjectType analyzedObject={analyzedObject} evenOdd={evenOdd} />
      );
    default:
      throw new Error();
  }
};

export default AnalyzedType;
