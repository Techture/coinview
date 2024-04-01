import React, { useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeContext, themes } from '../context/ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeType = typeof themes.light | typeof themes.dark;

interface IThemeContext {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(themes.dark);

  const isDarkMode = theme.type === 'dark';

  const toggleTheme = () => {
    setTheme((prevTheme: ThemeType) => (prevTheme === themes.dark ? themes.light : themes.dark));
  };

  const themeApi = useMemo(
    () => ({
      theme,
      isDarkMode,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={themeApi}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context as IThemeContext;
};

export default ThemeProvider;
