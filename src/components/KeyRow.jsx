import React from 'react';
import Key from './Key';
import './KeyRow.css';

const KeyRow = ({ keys }) => {
  return (
    <div className="key-row">
      {keys.map((key, index) => (
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
