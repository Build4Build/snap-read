import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { RootStackParamList } from '../navigation';

type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Type for a reading history item
type HistoryItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
};

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();

  // Navigate to camera
  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  // Empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Reading History Yet</Text>
      <Text style={styles.emptyText}>
        Your scanned documents will appear here. Start by scanning a document.
      </Text>
      <Button 
        mode="contained" 
        style={styles.scanButton}
        onPress={navigateToCamera}
      >
        Scan a Document
      </Button>
    </View>
  );

  // Sample empty array of history items
  const historyItems: HistoryItem[] = [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Reading History" 
        rightAction="search"
        onRightActionPress={() => {}}
      />
      
      <FlatList
        contentContainerStyle={styles.listContent}
        data={historyItems}
        keyExtractor={(item: HistoryItem) => item.id}
        renderItem={({ item }: { item: HistoryItem }) => null}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  scanButton: {
    backgroundColor: '#6200EE',
  },
});

export default HistoryScreen; 