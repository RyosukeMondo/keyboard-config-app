import React, { useContext } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import Key from './Key';
import './KeyRow.css';

const KeyRow = ({ keys }) => {
  const { isUpsideDown } = useContext(KeyAssignContext);

  const displayedKeys = isUpsideDown ? [...keys].reverse() : keys;

  return (
    <div className="key-row">
      {displayedKeys.map((key, index) => (
        <Key
          key_name={key.key_name}
          width={key.width}
          height={key.height}
          key={index}
        />
      ))}
    </div>
  );
};

export default KeyRow;