import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

type ThemeToggleProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isDarkMode: boolean;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChange, isDarkMode }) => {
  return (
    <label className="day-night-toggle">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={onChange}
        className="sr-only" // Screen-reader only utility class
      />
      <div className="toggle-bg">
        <span className={`${isDarkMode ? 'translate-x-full' : ''}`}>
          {isDarkMode ? (
            <FontAwesomeIcon icon={faMoon} color="#F7931A" width={17} />
          ) : (
            <FontAwesomeIcon icon={faSun} color="#34495E" />
          )}
        </span>
      </div>
    </label>
  );
};

export default ThemeToggle;
