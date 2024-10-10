import React, { useContext, useState } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import './Preview.css';

const Preview = () => {
  const { keyAssignments } = useContext(KeyAssignContext);
  const [viewMode, setViewMode] = useState('json'); // 'json' or 'text'

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  // Function to convert keyAssignments to readable text
  const renderTextPreview = () => {
    return Object.entries(keyAssignments).map(([key, assignment]) => (
      <div key={key} className="preview-item">
        <strong>{key}:</strong> {JSON.stringify(assignment, null, 2)}
      </div>
    ));
  };

  return (
    <div className="preview-container">
      <h2>Key Assignments Preview</h2>
      <div className="view-switcher">
        <button
          onClick={() => handleViewChange('json')}
          className={viewMode === 'json' ? 'active' : ''}
        >
          JSON Preview
        </button>
        <button
          onClick={() => handleViewChange('text')}
          className={viewMode === 'text' ? 'active' : ''}
        >
          Text Preview
        </button>
        {/* Add more buttons here for additional previews */}
      </div>
      <div className="preview-content">
        {viewMode === 'json' && (
          <pre>{JSON.stringify(keyAssignments, null, 2)}</pre>
        )}
        {viewMode === 'text' && renderTextPreview()}
        {/* Render additional previews based on viewMode */}
      </div>
    </div>
  );
};

export default Preview;
