import React, { useContext, useState } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import KeyAssignModal from './keyAssign/KeyAssignModal';
import './Key.css';

const Key = ({ key_name, width, height }) => {
  const { keyAssignments, mode } = useContext(KeyAssignContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const currentAssign = keyAssignments[key_name] || {};

  const getModifiersString = (modifiers) => {
    const modArray = [];
    if (modifiers.Win) modArray.push('Win');
    if (modifiers.Ctrl) modArray.push('Ctrl');
    if (modifiers.Alt) modArray.push('Alt');
    if (modifiers.Shift) modArray.push('Shift');
    return modArray.join('+');
  };

  const getDisplayLabel = () => {
    switch (mode) {
      case 'default':
        return key_name;
      case 'pretty':
        return currentAssign.pretty ? currentAssign.pretty.join(', ') : key_name;
      case 'subst':
        return currentAssign.subst || '';
      case 'modifiers':
        const mainModifiers = getModifiersString(currentAssign.modifiers || {});
        const modValue = currentAssign.modifiers?.mod >= 0 ? `mod${currentAssign.modifiers.mod}` : '';
        return [mainModifiers, modValue].filter(Boolean).join('+') || '';
      default:
        if (mode.startsWith('mod')) {
          const modNumber = mode.replace('mod', '');
          const modKey = currentAssign[`mod${modNumber}key`];
          if (modKey && modKey.key_name) {
            const modifiers = getModifiersString(modKey.modifiers);
            return modifiers ? `${modifiers}+${modKey.key_name}` : modKey.key_name;
          }
          return '';
        }
        return '';
    }
  };

  const displayLabel = getDisplayLabel();

  // Determine CSS class based on mode
  const modeClass = mode === 'pretty' ? 'pretty' :
                    mode === 'subst' ? 'subst' :
                    mode === 'modifiers' ? 'modifiers' :
                    mode.startsWith('mod') ? `mod${mode.replace('mod', '')}` :
                    'default';

  const additionalClass = key_name === '' ? 'black' : '';

  return (
    <>
      <div
        className={`key ${modeClass} ${additionalClass}`}
        style={{ width: `${width * 40}px`, height: `${height * 40}px` }}
        onClick={openModal}
      >
        {displayLabel}
      </div>
      {modalIsOpen && (
        <KeyAssignModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          keyName={key_name}
        />
      )}
    </>
  );
};

export default Key;