import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { KeyAssignContext } from '../context/KeyAssignContext';
import './KeyAssignModal.css';
import { key_names } from '../data/key_names';

Modal.setAppElement('#root'); // Accessibility

const defaultModKey = { key_name: '', modifiers: { Win: false, Ctrl: false, Alt: false, Shift: false } };

const KeyAssignModal = ({ isOpen, onRequestClose, keyName }) => {
  const { keyAssignments, updateKeyAssign } = useContext(KeyAssignContext);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateKeyAssign(keyName, formData);
    onRequestClose();
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