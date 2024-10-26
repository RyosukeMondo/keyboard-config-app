import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeSwitcher.css'; // Make sure to import the CSS

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const themes = [
    'default',
    'light',
    'blue',
    'pastel',
    'high-contrast',
    'soft-neutral',
    'monochrome',
  ];

  return (
    <div className="theme-switcher">
      <label htmlFor="theme-select">Choose Theme:</label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => toggleTheme(e.target.value)}
      >
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.replace('-', ' ').toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;