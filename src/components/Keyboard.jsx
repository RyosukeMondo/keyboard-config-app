import React from 'react';
import KeyRow from './KeyRow';
import keyConfig from '../config/key_config';
import './Keyboard.css';

const Keyboard = () => {
  return (
    <div className="keyboard">
      {keyConfig.map((row, rowIndex) => (
        <KeyRow keys={row} key={rowIndex} />
      ))}
    </div>
  );
};

export default Keyboard;
