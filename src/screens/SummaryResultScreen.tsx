import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { RootStackParamList } from '../navigation';

type SummaryResultScreenRouteProp = RouteProp<RootStackParamList, 'SummaryResult'>;
type SummaryResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SummaryResultScreen = () => {
  const navigation = useNavigation<SummaryResultScreenNavigationProp>();
  const route = useRoute<SummaryResultScreenRouteProp>();
  
  // Route params
  const { imageUri, summary, keywords } = route.params;

  // Navigate back to home
  const navigateToHome = () => {
    navigation.navigate('Main');
  };
  
  // Save the summary
  const handleSave = () => {
    // TODO: Implement actual saving to database
    // For now, just navigate back to home
    navigation.navigate('Main');
  };
  
  // Share the summary
  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing summary:', summary);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Summary Result" 
        showBackButton 
        onBackButtonPress={navigateToHome}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Original Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>
        
        {/* Keywords */}
        <Text style={styles.sectionTitle}>Keywords</Text>
        <View style={styles.keywordsContainer}>
          {keywords.map((keyword: string, index: number) => (
            <Chip 
              key={index} 
              style={styles.chip}
              mode="outlined"
            >
              {keyword}
            </Chip>
          ))}
        </View>
        
        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            style={styles.saveButton}
            onPress={handleSave}
          >
            Save
          </Button>
          <Button 
            mode="outlined" 
            style={styles.shareButton}
            onPress={handleShare}
          >
            Share
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryText: {
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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