import React from 'react';
import Keyboard from './components/Keyboard';
import ModeSelector from './components/ModeSelector';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Keyboard Configuration App</h1>
      <ModeSelector />
      <Keyboard />
    </div>
  );
}

export default App;
