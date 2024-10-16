import React, { createContext, useState, useEffect } from 'react';
import defaultKeyAssignments from '../data/key_assignments';

export const KeyAssignContext = createContext();

export const KeyAssignProvider = ({ children }) => {
  const [keyAssignments, setKeyAssignments] = useState({});
  const [mode, setMode] = useState('default'); // Modes: default, pretty, subst, modifiers, mod0 ~ mod9
  const [isUpsideDown, setIsUpsideDown] = useState(false); // New state for upside-down toggle

  // Load from localStorage or initialize with defaults
  useEffect(() => {
    const storedAssignments = localStorage.getItem('keyAssignments');
    if (storedAssignments) {
      setKeyAssignments(JSON.parse(storedAssignments));
    } else {
      setKeyAssignments(defaultKeyAssignments);
    }

    const storedMode = localStorage.getItem('currentMode');
    if (storedMode) {
      setMode(storedMode);
    }

    const storedUpsideDown = localStorage.getItem('isUpsideDown');
    if (storedUpsideDown) {
      setIsUpsideDown(JSON.parse(storedUpsideDown));
    }
  }, []);

  // Persist keyAssignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('keyAssignments', JSON.stringify(keyAssignments));
  }, [keyAssignments]);

  // Persist mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentMode', mode);
  }, [mode]);

  // Persist isUpsideDown to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isUpsideDown', JSON.stringify(isUpsideDown));
  }, [isUpsideDown]);

  // CRUD operations
  const createKeyAssign = (key_name, data) => {
    setKeyAssignments((prev) => ({
      ...prev,
      [key_name]: data,
    }));
  };

  const updateKeyAssign = (key_name, data) => {
    setKeyAssignments((prev) => ({
      ...prev,
      [key_name]: {
        ...prev[key_name],
        ...data,
      },
    }));
  };

  const deleteKeyAssign = (key_name) => {
    setKeyAssignments((prev) => {
      const updated = { ...prev };
      delete updated[key_name];
      return updated;
    });
  };

  const toggleUpsideDown = () => {
    setIsUpsideDown((prev) => !prev);
  };

  return (
    <KeyAssignContext.Provider
      value={{
        keyAssignments,
        setKeyAssignments,
        mode,
        setMode,
        isUpsideDown,
        toggleUpsideDown,
        createKeyAssign,
        updateKeyAssign,
        deleteKeyAssign,
      }}
    >
      {children}
    </KeyAssignContext.Provider>
  );
};