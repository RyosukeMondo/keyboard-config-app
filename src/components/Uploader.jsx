import React, { useContext } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import './Uploader.css';

const Uploader = () => {
  const { setKeyAssignments } = useContext(KeyAssignContext);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setKeyAssignments(json);
          alert('Key assignments updated successfully!');
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Error parsing JSON file. Please make sure it\'s a valid JSON format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">Upload Key Assignments</h2>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="file-input"
        aria-label="Upload Key Assignments"
      />
      <p className="upload-instructions">
        Select a JSON file containing key assignments to update the current configuration.
      </p>
    </div>
  );
};

export default Uploader;