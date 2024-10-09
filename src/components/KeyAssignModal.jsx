import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { KeyAssignContext } from '../context/KeyAssignContext';
import './KeyAssignModal.css';

Modal.setAppElement('#root'); // Accessibility

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
      mod0: 0,
      mod1: 0,
      mod2: 0,
      mod3: 0,
      mod4: 0,
      mod5: 0,
      mod6: 0,
      mod7: 0,
      mod8: 0,
      mod9: 0,
    },
    mod0key: '',
    mod1key: '',
    mod2key: '',
    mod3key: '',
    mod4key: '',
    mod5key: '',
    mod6key: '',
    mod7key: '',
    mod8key: '',
    mod9key: '',
  });

  useEffect(() => {
    if (keyAssignments[keyName]) {
      setFormData(keyAssignments[keyName]);
    }
  }, [keyAssignments, keyName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('modifiers.')) {
      const modifier = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        modifiers: {
          ...prev.modifiers,
          [modifier]:
            type === 'checkbox' ? checked : parseInt(value, 10) || 0,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox'
            ? checked
            : name.startsWith('mod') && name.endsWith('key')
            ? value
            : value.split(',').map((item) => item.trim()),
      }));
    }
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
            onChange={(e) =>
              setFormData({
                ...formData,
                pretty: e.target.value.split(',').map((item) => item.trim()),
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Substitute Key Name:</label>
          <input
            type="text"
            name="subst"
            value={formData.subst || ''}
            onChange={handleChange}
          />
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
          <legend>Modifiers:</legend>
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
          {Array.from({ length: 10 }, (_, i) => (
            <div key={`mod${i}`} className="modifier-group">
              <label>mod{i}:</label>
              <input
                type="number"
                name={`modifiers.mod${i}`}
                value={formData.modifiers[`mod${i}`]}
                onChange={handleChange}
                min="0"
                max="9"
              />
            </div>
          ))}
        </fieldset>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={`mod${i}key`} className="form-group">
            <label>mod{i} Key Name:</label>
            <input
              type="text"
              name={`mod${i}key`}
              value={formData[`mod${i}key`] || ''}
              onChange={handleChange}
            />
          </div>
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
