import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  // Navigate to camera screen
  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="SnapRead" />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <Text style={styles.welcomeText}>Welcome to SnapRead</Text>
        <Text style={styles.subtitle}>
          Scan documents, books, or articles to get instant summaries and insights
        </Text>
        
        {/* Scan Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Start Reading</Text>
            <Text style={styles.cardText}>
              Point your camera at any text to scan and get an AI-powered summary
            </Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              style={styles.button}
              onPress={navigateToCamera}
              icon="camera"
            >
              Scan Now
            </Button>
          </Card.Actions>
        </Card>
        
        {/* Reading Stats Preview */}
        <Card style={styles.statsCard}>
          <Card.Title title="Reading Statistics" />
          <Card.Content>
            <Text style={styles.statsText}>
              You haven't made any scans yet. Start scanning to track your reading!
            </Text>
          </Card.Content>
        </Card>
        
        {/* Quick Tips */}
        <Card style={styles.tipsCard}>
          <Card.Title 
            title="Quick Tips" 
            right={(props) => (
              <IconButton 
                {...props} 
                icon="lightbulb-outline" 
                onPress={() => {}} 
              />
            )}
          />
          <Card.Content>
            <Text style={styles.tipItem}>• Hold your camera steady for better results</Text>
            <Text style={styles.tipItem}>• Ensure good lighting for clear scanning</Text>
            <Text style={styles.tipItem}>• Use in well-lit environments for best results</Text>
          </Card.Content>
        </Card>
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
    paddingBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: '#6200EE',
  },
  statsCard: {
    marginBottom: 16,
  },
  statsText: {
    opacity: 0.7,
  },
  tipsCard: {
    marginBottom: 16,
  },
  tipItem: {
    marginBottom: 8,
  },
});

export default HomeScreen; 