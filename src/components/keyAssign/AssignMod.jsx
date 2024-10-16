import React from 'react';
import { key_names } from '../../data/key_names';

const AssignMod = ({ modNumber, formData, handleChange }) => {
  return (
    <fieldset key={`mod${modNumber}key`} className="form-group">
      <legend>mod{modNumber} Key:</legend>
      <div className="form-group">
        <label>Key Name:</label>
        <select
          name={`mod${modNumber}key.key_name`}
          value={formData[`mod${modNumber}key`]?.key_name || ''}
          onChange={handleChange}
        >
          <option value="">Select a key</option>
          {key_names.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <legend>Modifiers:</legend>
        {['Win', 'Ctrl', 'Alt', 'Shift'].map((mod) => (
          <label key={mod} className="checkbox-label">
            <input
              type="checkbox"
              name={`mod${modNumber}key.modifiers.${mod}`}
              checked={formData[`mod${modNumber}key`]?.modifiers?.[mod] || false}
              onChange={handleChange}
            />
            {mod}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default AssignMod;