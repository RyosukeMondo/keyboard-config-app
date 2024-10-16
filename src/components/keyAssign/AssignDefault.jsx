import React from 'react';

const AssignDefault = ({ formData, handleChange, key_names }) => {
  return (
    <>
      <div className="form-group">
        <label>Pretty (comma-separated):</label>
        <input
          type="text"
          name="pretty"
          value={formData.pretty.join(', ')}
          onChange={handleChange}
        />
      </div>
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
      {/* Render all mod0~mod9 configurations */}
      {Array.from({ length: 10 }, (_, i) => (
        <fieldset key={`mod${i}key`} className="form-group">
          <legend>mod{i} Key:</legend>
          <div className="form-group">
            <label>Key Name:</label>
            <select
              name={`mod${i}key.key_name`}
              value={formData[`mod${i}key`]?.key_name || ''}
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
                  name={`mod${i}key.modifiers.${mod}`}
                  checked={formData[`mod${i}key`]?.modifiers?.[mod] || false}
                  onChange={handleChange}
                />
                {mod}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </>
  );
};

export default AssignDefault;