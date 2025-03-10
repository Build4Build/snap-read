import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Define theme types
type ThemeMode = 'light' | 'dark' | 'system';

// Define custom theme colors
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#121212',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
  },
};

// Create theme context
type ThemeContextType = {
  theme: typeof lightTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isThemeDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeMode: 'system',
  setThemeMode: () => {},
  isThemeDark: false,
  toggleTheme: () => {},
});

// Create theme provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  
  // Determine if theme is dark based on theme mode and system theme
  const isThemeDark = 
    themeMode === 'system' ? colorScheme === 'dark' : themeMode === 'dark';
  
  // Select theme based on dark/light
  const theme = isThemeDark ? darkTheme : lightTheme;
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode(isThemeDark ? 'light' : 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeMode, 
      setThemeMode, 
      isThemeDark,
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create theme hook
export const useTheme = () => useContext(ThemeContext); 