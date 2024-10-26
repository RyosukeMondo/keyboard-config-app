import React from 'react';

const AssignMod = ({ modNumber, formData, handleChange, key_names }) => {
  return (
    <fieldset key={`mod${modNumber}key`} className="form-group">
      <legend>mod{modNumber} Key:</legend>
      <div className="form-group">
        <label>Key Name:</label>
        <select
          name={`mod${modNumber}key.key_name`}
          value={formData?.key_name || ''}
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
        <label>Modifiers:</label>
        {['Win', 'Ctrl', 'Alt', 'Shift'].map((mod) => (
          <label key={mod} className="checkbox-label">
            <input
              type="checkbox"
              name={`mod${modNumber}key.modifiers.${mod}`}
              checked={formData?.modifiers?.[mod] || false}
              onChange={handleChange}
            />
            {mod}
          </label>
        ))}
      </div>
      <div className="form-group">
        <label>Note:</label>
        <input
          type="text"
          name={`mod${modNumber}key.note`}
          value={formData?.note || ''}
          onChange={handleChange}
          placeholder="Enter a note"
        />
      </div>
    </fieldset>
  );
};

export default AssignMod;
