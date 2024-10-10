import React from 'react';
import Keyboard from './components/Keyboard';
import ModeSelector from './components/ModeSelector';
import Preview from './components/Preview';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Keyboard Configuration App</h1>
      <ModeSelector />
      <Keyboard />
      <Preview />
    </div>
  );
}

export default App;
