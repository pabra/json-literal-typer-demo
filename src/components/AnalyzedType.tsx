import {
  ArrayObject,
  BooleanObject,
  NullObject,
  NumberObject,
  ObjectObject,
  StringObject,
} from 'json-literal-typer/dist/esm/analyze';
import React from 'react';
import AnalyzedArrayType from './AnalyzedArrayType';
import AnalyzedBooleanType from './AnalyzedBooleanType';
import AnalyzedNullType from './AnalyzedNullType';
import AnalyzedNumberType from './AnalyzedNumberType';
import AnalyzedObjectType from './AnalyzedObjectType';
import AnalyzedStringType from './AnalyzedStringType';

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
