import React from 'react';
import Keyboard from './components/Keyboard';
import ModeSelector from './components/ModeSelector';
import Preview from './components/Preview';
import './App.css';
import Uploader from './components/Uploader';
import SelectConfig from './components/SelectConfig';
import Explain from './components/Explain';
import Themeswitcher from './components/ThemeSwitcher';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Keyboard Configuration App</h1>
      </header>
      <main className="app-main">
        <Themeswitcher />
        <details>
          <summary>Configuration</summary>
          <SelectConfig />
        </details>
        <details>
          <summary>Mode Selection</summary>
          <ModeSelector />
        </details>
        <Keyboard />
        <details>
          <summary>Preview</summary>
          <Preview />
        </details>
        <details>
          <summary>Upload Configuration</summary>
          <Uploader />
        </details>
        <details>
          <summary>Explanation</summary>
          <Explain />
        </details>
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Keyboard Config App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;