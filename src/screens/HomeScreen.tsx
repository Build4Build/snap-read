import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';

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
            <View style={styles.cardHeader}>
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={styles.cardTitle}>Start Reading</Text>
            </View>
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

        {/* Scanning Tips */}
        <Card style={styles.tipsCard}>
          <Card.Content>
            <Text style={styles.tipsTitle}>📋 Quick Scanning Tips</Text>
            <View style={styles.tipsGrid}>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>Good lighting</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>🔍</Text>
                <Text style={styles.tipText}>Center the text</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>👤</Text>
                <Text style={styles.tipText}>Avoid shadows</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipIcon}>📚</Text>
                <Text style={styles.tipText}>Flat surface</Text>
              </View>
            </View>
          </Card.Content>
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
                onPress={() => { }}
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cameraIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
    lineHeight: 22,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 16,
  },
  tipsCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#666',
  },
  statsCard: {
    marginBottom: 16,
  },
  statsText: {
    opacity: 0.7,
  },
});

export default HomeScreen; 