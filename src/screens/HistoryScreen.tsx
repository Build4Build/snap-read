import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
import { Text, Card, Button, IconButton, ActivityIndicator, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { RootStackParamList } from '../types/navigation';
import { getDocuments, deleteDocument, ScannedDocument } from '../services/database';

type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  
  // State
  const [documents, setDocuments] = useState<ScannedDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load documents when screen focuses
  useFocusEffect(
    React.useCallback(() => {
      loadDocuments();
    }, [])
  );

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to camera
  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  // View document details
  const viewDocument = (document: ScannedDocument) => {
    navigation.navigate('SummaryResult', {
      imageUri: document.imageUri,
      summary: 'Document from history',
      keywords: document.tags || [],
      documentType: document.type || 'other',
    });
  };

  // Delete document
  const handleDeleteDocument = (documentId: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDocument(documentId);
              await loadDocuments(); // Refresh the list
            } catch (error) {
              console.error('Error deleting document:', error);
              Alert.alert('Error', 'Failed to delete document');
            }
          },
        },
      ]
    );
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render document item
  const renderDocumentItem = ({ item }: { item: ScannedDocument }) => (
    <Card style={styles.documentCard} onPress={() => viewDocument(item)}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.imageUri }} style={styles.documentImage} />
        <View style={styles.documentInfo}>
          <Text variant="titleMedium" numberOfLines={2} style={styles.documentTitle}>
            {item.title || 'Untitled Document'}
          </Text>
          <Text variant="bodySmall" style={styles.documentDate}>
            {formatDate(item.createdAt)}
          </Text>
          {item.type && (
            <Chip mode="outlined" style={styles.typeChip}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Chip>
          )}
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 2).map((tag, index) => (
                <Chip key={index} mode="flat" style={styles.tagChip}>
                  {tag}
                </Chip>
              ))}
              {item.tags.length > 2 && (
                <Text style={styles.moreTagsText}>+{item.tags.length - 2} more</Text>
              )}
            </View>
          )}
        </View>
        <IconButton
          icon="delete"
          mode="outlined"
          size={20}
          onPress={() => handleDeleteDocument(item.id)}
          style={styles.deleteButton}
        />
      </View>
    </Card>
  );

  // Empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📚</Text>
      <Text style={styles.emptyTitle}>No Reading History Yet</Text>
      <Text style={styles.emptyText}>
        Your scanned documents will appear here. Start by scanning a document to build your reading history.
      </Text>
      <Button 
        mode="contained" 
        style={styles.scanButton}
        onPress={navigateToCamera}
        icon="camera"
      >
        Scan Your First Document
      </Button>
    </View>
  );

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Reading History" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Loading your documents...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Reading History" />
      
      {documents.length === 0 ? (
        renderEmptyState()
      ) : (
        <View style={styles.content}>
          <Text style={styles.countText}>
            {documents.length} document{documents.length !== 1 ? 's' : ''} saved
          </Text>
          <FlatList
            data={documents}
            renderItem={renderDocumentItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  // Document card styles
  documentCard: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  documentImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  documentTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  documentDate: {
    opacity: 0.7,
    marginBottom: 8,
  },
  typeChip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    backgroundColor: '#E8F5E8',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tagChip: {
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: '#F0F0F0',
  },
  moreTagsText: {
    fontSize: 12,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#FFE8E8',
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
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
    lineHeight: 22,
  },
  scanButton: {
    backgroundColor: '#6200EE',
  },
});

export default HistoryScreen; 