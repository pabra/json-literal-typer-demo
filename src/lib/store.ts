import makeStore from 'react-hooksack';
import {
  NullObject,
  BooleanObject,
  NumberObject,
  StringObject,
  ArrayObject,
  ObjectObject,
} from 'json-literal-typer/lib/analyze';

type AnalyzedData =
  | null
  | NullObject
  | BooleanObject
  | NumberObject
  | StringObject
  | ArrayObject
  | ObjectObject;

interface Config {
  maxLiteralPerType?: number;
  byPath: Record<string, { forceType?: boolean; baseType?: boolean }>;
}

interface ConfigReducerAction {
  path: string;
  config: {
    baseType?: boolean;
    forceType?: boolean;
  };
}

const configReducer = (state: Config, action: ConfigReducerAction) => {
  const newState = { ...state };

  if (!Object.prototype.hasOwnProperty.call(newState.byPath, action.path)) {
    newState.byPath[action.path] = {};
  }

  newState.byPath[action.path] = {
    ...newState.byPath[action.path],
    ...action.config,
  };

  return newState;
};

const store = {
  useJsonString: makeStore(''),
  useTypesciptString: makeStore(''),
  useAnalyzedData: makeStore<AnalyzedData, never>(null),
  useConfig: makeStore<Config, typeof configReducer>(
    { byPath: {} },
    configReducer,
  ),
};

export default store;
