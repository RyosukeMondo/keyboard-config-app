import React, { useContext } from 'react';
import keyConfigs from '../config/key_config';
import { KeyAssignContext } from '../context/KeyAssignContext';
import './SelectConfig.css'; // Optional: Create this file for styling

const SelectConfig = () => {
  const { selectedConfig, changeSelectedConfig } = useContext(KeyAssignContext);

  const handleChange = (e) => {
    changeSelectedConfig(e.target.value);
  };

  return (
    <div className="select-config">
      <label htmlFor="config-select">Select Key Configuration: </label>
      <select id="config-select" value={selectedConfig} onChange={handleChange}>
        {keyConfigs.map((config) => (
          <option key={config.config_name} value={config.config_name}>
            {config.config_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectConfig;