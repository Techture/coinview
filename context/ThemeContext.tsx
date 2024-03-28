import { createContext } from 'react';

type Theme = {
  type: string;
  fontColor: string;
  background: string;
};

export const themes: Record<string, Theme> = {
  light: {
    type: 'light',
    fontColor: '#2b2c38',
    background: '#f4f7f9',
  },
  dark: {
    type: 'dark',
    fontColor: '#dcdcdc',
    background: '#2b2c38',
  },
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  toggleTheme: () => {},
});
