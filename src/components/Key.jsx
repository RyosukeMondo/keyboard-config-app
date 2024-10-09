import React, { useContext, useState } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import KeyAssignModal from './KeyAssignModal';
import './Key.css';

const Key = ({ key_name, width, height }) => {
  const { keyAssignments, mode } = useContext(KeyAssignContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const currentAssign = keyAssignments[key_name] || {};

  // Determine what to display based on the current mode
  let displayLabel = key_name; // Default display

  switch (mode) {
    case 'default':
      displayLabel = key_name;
      break;
    case 'pretty':
      displayLabel = currentAssign.pretty
        ? currentAssign.pretty.join(', ')
        : key_name;
      break;
    case 'subst':
      displayLabel = currentAssign.subst || key_name;
      break;
    case 'modifiers':
      const modifiers = [];
      if (currentAssign.modifiers?.Win) modifiers.push('Win');
      if (currentAssign.modifiers?.Ctrl) modifiers.push('Ctrl');
      if (currentAssign.modifiers?.Alt) modifiers.push('Alt');
      if (currentAssign.modifiers?.Shift) modifiers.push('Shift');
      displayLabel = modifiers.length > 0 ? modifiers.join('+') : key_name;
      break;
    default:
      if (mode.startsWith('mod')) {
        const modNumber = mode.replace('mod', '');
        const modKey = currentAssign[`mod${modNumber}key`];
        displayLabel = modKey || key_name;
      }
      break;
  }

  // Determine CSS class based on mode
  let modeClass = 'default';

  if (mode === 'pretty') {
    modeClass = 'pretty';
  } else if (mode === 'subst') {
    modeClass = 'subst';
  } else if (mode === 'modifiers') {
    modeClass = 'modifiers';
  } else if (mode.startsWith('mod')) {
    modeClass = `mod${mode.replace('mod', '')}`;
  }

  return (
    <>
      <div
        className={`key ${modeClass}`}
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
