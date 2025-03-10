import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import Navigation from './src/navigation';

// Wrap app with providers
const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
        <Navigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

// Main app component
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App; 