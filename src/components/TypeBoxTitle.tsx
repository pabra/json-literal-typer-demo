import { ValuesByType } from 'json-literal-typer/dist/esm/analyze';
import React from 'react';
import styles from './TypeBoxTitle.module.css';

interface Props {
  type: keyof ValuesByType;
  name: string | symbol;
}

const TypeBoxTitle: React.FC<Props> = ({ type, name }: Props) => {
  return (
    <div className="title">
      <span className={`type ${styles.type}`}>{type}</span>
      <span className={`name ${styles.name}`}>{name}</span>
    </div>
  );
};

export default TypeBoxTitle;
