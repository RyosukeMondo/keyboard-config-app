import React, { useContext } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import KeyRow from './KeyRow';
import keyConfig from '../config/key_config';
import './Keyboard.css';

const Keyboard = () => {
  const { isUpsideDown } = useContext(KeyAssignContext);

  const displayedKeyConfig = isUpsideDown ? [...keyConfig].reverse() : keyConfig;

  return (
    <div className={`keyboard ${isUpsideDown ? 'upside-down' : ''}`}>
      {displayedKeyConfig.map((row, rowIndex) => (
        <KeyRow keys={row} key={rowIndex} />
      ))}
    </div>
  );
};

export default Keyboard;