import React, { useContext, useState, useCallback } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import useTextOutput from '../hooks/useTextOutput';
import { Button } from './ui/button';
import { Clipboard, Download } from 'lucide-react';
import './Preview.css';

const Preview = () => {
  const { keyAssignments } = useContext(KeyAssignContext);
  const [viewMode, setViewMode] = useState('json');
  const textOutput = useTextOutput(keyAssignments);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const getContent = useCallback(() => {
    return viewMode === 'json'
      ? JSON.stringify(keyAssignments, null, 2)
      : textOutput;
  }, [viewMode, keyAssignments, textOutput]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getContent());
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard.');
    }
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([getContent()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `key_assignments.${viewMode === 'json' ? 'json' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="preview-container">
      <h2 className="preview-title">Key Assignments Preview</h2>
      <div className="view-switcher">
        <Button
          onClick={() => handleViewChange('json')}
          variant={viewMode === 'json' ? 'primary' : 'outline'}
          className="switch-button"
        >
          JSON Preview
        </Button>
        <Button
          onClick={() => handleViewChange('text')}
          variant={viewMode === 'text' ? 'primary' : 'outline'}
          className="switch-button"
        >
          Text Preview
        </Button>
      </div>
      <div className="preview-content">
        <pre>{getContent()}</pre>
      </div>
      <div className="action-buttons">
        <Button onClick={copyToClipboard} className="action-button">
          <Clipboard className="icon" /> Copy to Clipboard
        </Button>
        <Button onClick={downloadContent} className="action-button">
          <Download className="icon" /> Download
        </Button>
      </div>
    </div>
  );
};

export default Preview;