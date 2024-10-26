import React, { useContext } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import KeyRow from './KeyRow';
import keyConfigs from '../config/key_config'; // Import all key configurations
import './Keyboard.css';

const Keyboard = () => {
  const { isUpsideDown, selectedConfig } = useContext(KeyAssignContext);

  // Find the key_config that matches the selectedConfig
  const currentConfigObj = keyConfigs.find(
    (config) => config.config_name === selectedConfig
  );

  const currentKeyConfig = currentConfigObj
    ? currentConfigObj.key_config
    : keyConfigs[0].key_config; // Fallback to first config if not found

  const displayedKeyConfig = isUpsideDown
    ? [...currentKeyConfig].reverse()
    : currentKeyConfig;

  return (
    <div className={`keyboard ${isUpsideDown ? 'upside-down' : ''}`}>
      {displayedKeyConfig.map((row, rowIndex) => (
        <KeyRow keys={row} key={rowIndex} />
      ))}
    </div>
  );
};

export default Keyboard;