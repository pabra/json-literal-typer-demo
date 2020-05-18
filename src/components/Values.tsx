import React from 'react';
import styles from './Values.module.scss';

interface Props {
  values:
    | { type: 'null'; values: Set<null> }
    | { type: 'boolean'; values: Set<boolean> }
    | { type: 'number'; values: Set<number> }
    | { type: 'string'; values: Set<string> };
}

const Values: React.FC<Props> = ({ values }: Props) => {
  const ValueElements: JSX.Element[] = [];

  switch (values.type) {
    case 'null':
      Array.from(values.values)
        .sort()
        .forEach((v, k) =>
          ValueElements.push(
            <span
              key={`${k}:${v}`}
              className={`value ${styles[values.type]} ${styles.value}`}
            >
              {JSON.stringify(v)}
            </span>,
          ),
        );
      break;
    case 'boolean':
      Array.from(values.values)
        .sort()
        .forEach((v, k) =>
          ValueElements.push(
            <span
              key={`${k}:${v}`}
              className={`value ${styles[values.type]} ${styles.value}`}
            >
              {JSON.stringify(v)}
            </span>,
          ),
        );
      break;
    case 'number':
      Array.from(values.values)
        .sort()
        .forEach((v, k) =>
          ValueElements.push(
            <span
              key={`${k}:${v}`}
              className={`value ${styles[values.type]} ${styles.value}`}
            >
              {JSON.stringify(v)}
            </span>,
          ),
        );
      break;
    case 'string':
      Array.from(values.values)
        .sort()
        .forEach((v, k) =>
          ValueElements.push(
            <span
              key={`${k}:${v}`}
              className={`value ${styles[values.type]} ${styles.value}`}
            >
              {JSON.stringify(v)}
            </span>,
          ),
        );
      break;
  }

  return (
    <div className={styles.root}>
      {' '}
      {values.values.size} {values.values.size === 1 ? 'value' : 'values'}:{' '}
      {ValueElements.map(v => v)}
    </div>
  );
};

export default Values;
