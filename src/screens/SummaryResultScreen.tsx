import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Alert } from 'react-native';
import { Text, Button, Chip, ActivityIndicator, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { RootStackParamList } from '../types/navigation';
import { extractTextFromImage, analyzeText } from '../services/aiService';
import { saveDocument } from '../services/database';

type SummaryResultScreenRouteProp = RouteProp<RootStackParamList, 'SummaryResult'>;
type SummaryResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProcessedData {
  summary: string;
  keywords: string[];
  quotes: string[];
  documentType: 'book' | 'magazine' | 'newspaper' | 'article' | 'other';
}

const SummaryResultScreen = () => {
  const navigation = useNavigation<SummaryResultScreenNavigationProp>();
  const route = useRoute<SummaryResultScreenRouteProp>();
  
  // Route params
  const { imageUri, summary, keywords, quotes, documentType, isProcessing } = route.params;
  
  // State
  const [isLoading, setIsLoading] = useState(isProcessing || false);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(
    summary ? { summary, keywords: keywords || [], quotes: quotes || [], documentType: documentType || 'other' } : null
  );
  const [error, setError] = useState<string | null>(null);

  // Process image when component mounts if needed
  useEffect(() => {
    if (isProcessing && !processedData) {
      processImage();
    }
  }, [isProcessing, processedData]);

  // Process the captured image
  const processImage = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Extract text from image using OCR
      const extractedText = await extractTextFromImage(imageUri);
      
      // Analyze text with AI
      const analysis = await analyzeText(extractedText);
      
      setProcessedData(analysis);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate back to home
  const navigateToHome = () => {
    navigation.navigate('Home');
  };
  
  // Save the summary to database
  const handleSave = async () => {
    if (!processedData) return;
    
    try {
      const documentId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await saveDocument({
        id: documentId,
        title: `${processedData.documentType} - ${new Date().toLocaleDateString()}`,
        imageUri,
        createdAt: new Date(),
        type: processedData.documentType,
        tags: processedData.keywords,
      });
      
      Alert.alert('Success', 'Document saved to your history!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving document:', error);
      Alert.alert('Error', 'Failed to save document. Please try again.');
    }
  };
  
  // Share the summary
  const handleShare = async () => {
    if (!processedData) return;
    
    try {
      const shareContent = `SnapRead Summary:\n\n${processedData.summary}\n\nKeywords: ${processedData.keywords.join(', ')}`;
      
      // In a real app, you would use Expo's sharing API
      console.log('Sharing content:', shareContent);
      Alert.alert('Share', 'Sharing functionality would be implemented here.');
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share content.');
    }
  };

  // Retry processing
  const handleRetry = () => {
    processImage();
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header 
          title="Processing..." 
          showBackButton 
          onBackPress={navigateToHome}
        />
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Analyzing your document...</Text>
          <Text style={styles.loadingSubtext}>This may take a few moments</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header 
          title="Error" 
          showBackButton 
          onBackPress={navigateToHome}
        />
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>😞</Text>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button 
            mode="contained" 
            style={styles.retryButton}
            onPress={handleRetry}
          >
            Try Again
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // Main content
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Analysis Complete" 
        showBackButton 
        onBackPress={navigateToHome}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Original Image */}
        <Card style={styles.imageCard}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image} 
            resizeMode="cover"
          />
        </Card>
        
        {processedData && (
          <>
            {/* Document Type */}
            <View style={styles.documentTypeContainer}>
              <Text style={styles.documentTypeLabel}>Document Type:</Text>
              <Chip mode="outlined" style={styles.documentTypeChip}>
                {processedData.documentType.charAt(0).toUpperCase() + processedData.documentType.slice(1)}
              </Chip>
            </View>
            
            {/* Keywords */}
            <Text style={styles.sectionTitle}>Key Topics</Text>
            <View style={styles.keywordsContainer}>
              {processedData.keywords.map((keyword: string, index: number) => (
                <Chip 
                  key={index} 
                  style={styles.chip}
                  mode="flat"
                >
                  {keyword}
                </Chip>
              ))}
            </View>
            
            {/* Summary */}
            <Text style={styles.sectionTitle}>Summary</Text>
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Text style={styles.summaryText}>{processedData.summary}</Text>
              </Card.Content>
            </Card>
            
            {/* Quotes */}
            {processedData.quotes.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Key Quotes</Text>
                {processedData.quotes.map((quote: string, index: number) => (
                  <Card key={index} style={styles.quoteCard}>
                    <Card.Content>
                      <Text style={styles.quoteText}>"{quote}"</Text>
                    </Card.Content>
                  </Card>
                ))}
              </>
            )}
            
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                style={styles.saveButton}
                onPress={handleSave}
                icon="content-save"
              >
                Save to History
              </Button>
              <Button 
                mode="outlined" 
                style={styles.shareButton}
                onPress={handleShare}
                icon="share"
              >
                Share
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
    textAlign: 'center',
  },
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#6200EE',
  },
  // Content styles
  imageCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  documentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  documentTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  documentTypeChip: {
    backgroundColor: '#E8F5E8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
    backgroundColor: '#F0F0F0',
  },
  summaryCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  summaryText: {
    lineHeight: 24,
    fontSize: 16,
  },
  quoteCard: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 15,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#6200EE',
  },
  shareButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#6200EE',
  },
});

export default SummaryResultScreen; 