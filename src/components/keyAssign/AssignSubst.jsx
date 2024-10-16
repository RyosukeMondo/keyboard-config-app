import React from 'react';
import { key_names } from '../../data/key_names';

const AssignSubst = ({ formData, handleChange }) => {
  return (
    <>
      <div className="form-group">
        <label>Substitute Key Name:</label>
        <select
          name="subst"
          value={formData.subst}
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
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="is_one_shot"
            checked={formData.is_one_shot}
            onChange={handleChange}
          />
          Is One-Shot
        </label>
      </div>
      <fieldset className="form-group">
        <legend>Main Modifiers:</legend>
        {['Win', 'Ctrl', 'Alt', 'Shift'].map((mod) => (
          <label key={mod} className="checkbox-label">
            <input
              type="checkbox"
              name={`modifiers.${mod}`}
              checked={formData.modifiers[mod]}
              onChange={handleChange}
            />
            {mod}
          </label>
        ))}
        <div className="form-group">
          <label>Mod Value:</label>
          <select
            name="modifiers.mod"
            value={formData.modifiers.mod}
            onChange={handleChange}
          >
            {Array.from({ length: 11 }, (_, i) => i - 1).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </>
  );
};

export default AssignSubst;