import { Theme } from '../types';

export const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    text: '#333333',
    primary: '#4a6fa5',
    secondary: '#637081',
    accent: '#62c370',
    border: '#e0e0e0',
    error: '#e74c3c',
    success: '#27ae60'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.5s ease'
};

export const darkTheme: Theme = {
  colors: {
    background: '#282c34',
    text: '#e0e0e0',
    primary: '#90caf9',
    secondary: '#a0a0a0',
    accent: '#69f0ae',
    border: '#555555',
    error: '#ff5252',
    success: '#69f0ae'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.5s ease'
}; 