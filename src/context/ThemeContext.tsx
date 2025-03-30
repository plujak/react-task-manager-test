import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';
import { Theme } from '../types';

/**
 * State and toggling function for theme mode.
 */
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider. Manages theme state and provides toggle ability.
 * @param children - Child components that will recieve theme context
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme: Theme = isDarkMode ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context.
 * 
 * @returns ThemeContextType with isDarkMode state and toggle function
 * @throws Error when used in the wrong context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 