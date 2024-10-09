// src/context/KeyAssignContext.js

import React, { createContext, useState, useEffect } from 'react';
import defaultKeyAssignments from '../data/key_assignments';

export const KeyAssignContext = createContext();

export const KeyAssignProvider = ({ children }) => {
  const [keyAssignments, setKeyAssignments] = useState({});
  const [mode, setMode] = useState('default'); // Modes: default, pretty, subst, modifiers, mod0 ~ mod9

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
  }, []);

  // Persist keyAssignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('keyAssignments', JSON.stringify(keyAssignments));
  }, [keyAssignments]);

  // Persist mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentMode', mode);
  }, [mode]);

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

  return (
    <KeyAssignContext.Provider
      value={{
        keyAssignments,
        setKeyAssignments,
        mode,
        setMode,
        createKeyAssign,
        updateKeyAssign,
        deleteKeyAssign,
      }}
    >
      {children}
    </KeyAssignContext.Provider>
  );
};
