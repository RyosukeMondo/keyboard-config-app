import React, { useContext, useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { KeyAssignContext } from '../../context/KeyAssignContext';
import './KeyAssignModal.css';
import AssignDefault from './AssignDefault';
import AssignPretty from './AssignPretty';
import AssignSubst from './AssignSubst';
import AssignMod from './AssignMod';
import key_names from '../../data/key_names';

Modal.setAppElement('#root'); // Accessibility

const defaultModKey = { key_name: '', modifiers: { Win: false, Ctrl: false, Alt: false, Shift: false } };

const KeyAssignModal = ({ isOpen, onRequestClose, keyName }) => {
  const { keyAssignments, updateKeyAssign, mode } = useContext(KeyAssignContext);
  const [formData, setFormData] = useState({
    pretty: [],
    subst: '',
    is_one_shot: false,
    modifiers: {
      Win: false,
      Ctrl: false,
      Alt: false,
      Shift: false,
      mod: -1,
    },
    ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`mod${i}key`, defaultModKey])),
  });

  useEffect(() => {
    if (keyAssignments[keyName]) {
      const assignment = keyAssignments[keyName];
      setFormData(prev => ({
        ...prev,
        ...assignment,
        ...Object.fromEntries(
          Array.from({ length: 10 }, (_, i) => [
            `mod${i}key`,
            assignment[`mod${i}key`] || defaultModKey
          ])
        ),
      }));
    }
  }, [keyAssignments, keyName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const newFormData = { ...prev };

      if (name.startsWith('modifiers.')) {
        const [, modifier] = name.split('.');
        newFormData.modifiers = {
          ...newFormData.modifiers,
          [modifier]: type === 'checkbox' ? checked : parseInt(value, 10) || 0,
        };
      } else if (name.startsWith('mod') && name.endsWith('.key_name')) {
        const [modKey] = name.split('.');
        newFormData[modKey] = {
          ...newFormData[modKey],
          key_name: value,
        };
      } else if (name.startsWith('mod') && name.includes('.modifiers.')) {
        const [modKey, , modifier] = name.split('.');
        newFormData[modKey] = {
          ...newFormData[modKey],
          modifiers: {
            ...newFormData[modKey]?.modifiers,
            [modifier]: checked,
          },
        };
      } else {
        newFormData[name] = type === 'checkbox'
          ? checked
          : name === 'pretty'
          ? value.split(',').map((item) => item.trim())
          : value;
      }

      return newFormData;
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    updateKeyAssign(keyName, formData);
    onRequestClose();
  });

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onRequestClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit, onRequestClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Determine which sub-component to render based on the current mode
  const renderModeComponent = () => {
    if (mode === 'default') {
      return <AssignDefault formData={formData} handleChange={handleChange} key_names={key_names} />;
    } else if (mode === 'pretty') {
      return <AssignPretty formData={formData} handleChange={handleChange} />;
    } else if (mode === 'subst') {
      return <AssignSubst formData={formData} handleChange={handleChange} key_names={key_names} />;
    } else if (mode.startsWith('mod')) {
      const modNumber = mode.replace('mod', '');
      return <AssignMod modNumber={modNumber} formData={formData} handleChange={handleChange} key_names={key_names} />;
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`Edit ${keyName} Assignment`}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Edit {keyName} Assignment</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        {renderModeComponent()}
        <div className="modal-actions">
          <button type="submit" className="save-button">
            Save
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default KeyAssignModal;