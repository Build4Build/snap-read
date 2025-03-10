import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../types/navigation';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightActions?: React.ReactNode;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightActions,
  onBackPress,
}) => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
      {showBackButton && (
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor={theme.colors.onPrimary}
          onPress={handleBackPress}
        />
      )}
      <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onPrimary }]}>
        {title}
      </Text>
      <View style={styles.rightActions}>
        {rightActions}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 56,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: 48, // To center the title accounting for the back button
  },
  rightActions: {
    position: 'absolute',
    right: 8,
  },
}); 