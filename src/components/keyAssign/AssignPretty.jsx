import React from 'react';

const AssignPretty = ({ formData, handleChange }) => {
  return (
    <div className="form-group">
      <label>Pretty (comma-separated):</label>
      <input
        type="text"
        name="pretty"
        value={formData.pretty.join(', ')}
        onChange={handleChange}
      />
    </div>
  );
};

export default AssignPretty;