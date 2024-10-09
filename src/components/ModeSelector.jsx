import React, { useContext } from 'react';
import { KeyAssignContext } from '../context/KeyAssignContext';
import './ModeSelector.css';

const modes = [
  'default',
  'pretty',
  'subst',
  'modifiers',
  'mod0',
  'mod1',
  'mod2',
  'mod3',
  'mod4',
  'mod5',
  'mod6',
  'mod7',
  'mod8',
  'mod9',
];

const ModeSelector = () => {
  const { mode, setMode } = useContext(KeyAssignContext);

  const handleChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="mode-selector">
      <label htmlFor="mode-select">Select Mode: </label>
      <select id="mode-select" value={mode} onChange={handleChange}>
        {modes.map((m) => (
          <option key={m} value={m}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModeSelector;
