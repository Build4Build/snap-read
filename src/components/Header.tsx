import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

export type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  onBackButtonPress?: () => void;
  rightAction?: 'search' | 'more';
  onRightActionPress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  onBackButtonPress,
  rightAction,
  onRightActionPress 
}) => {
  const { theme } = useTheme();
  const paperTheme = usePaperTheme();

  return (
    <Appbar.Header
      style={[
        styles.header,
        { backgroundColor: theme.colors.surface }
      ]}
    >
      {showBackButton && (
        <Appbar.BackAction
          onPress={onBackButtonPress}
          color={theme.colors.primary}
        />
      )}
      
      <Appbar.Content
        title={title}
        titleStyle={{ color: theme.colors.text }}
      />
      
      {rightAction === 'search' && (
        <Appbar.Action 
          icon="magnify" 
          color={theme.colors.primary}
          onPress={onRightActionPress} 
        />
      )}
      
      {rightAction === 'more' && (
        <Appbar.Action 
          icon="dots-vertical" 
          color={theme.colors.primary}
          onPress={onRightActionPress} 
        />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
}); 