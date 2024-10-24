import React from 'react';
import Keyboard from './components/Keyboard';
import ModeSelector from './components/ModeSelector';
import Preview from './components/Preview';
import './App.css';
import Uploader from './components/Uploader';
import SelectConfig from './components/SelectConfig';
import Explain from './components/Explain';

function App() {
  return (
      <div className="App">
        <h1>Keyboard Configuration App</h1>
        <SelectConfig />
        <ModeSelector />
        <Keyboard />
        <Preview />
        <Uploader />
        <Explain />
      </div>
  );
}

export default App;