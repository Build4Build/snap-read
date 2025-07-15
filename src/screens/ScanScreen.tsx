import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, Button, Surface, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { RootStackParamList } from '../navigation';

type ScanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScanScreen = () => {
  const navigation = useNavigation<ScanScreenNavigationProp>();

  // Navigate to camera screen
  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Scan" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            Scan Your Reading Material
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Take a picture of any book, magazine, or article to get an AI-powered summary and insights.
          </Text>
        </View>

        <Card style={styles.mainCard}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Take a Picture
            </Text>
            <Text variant="bodyMedium" style={styles.cardDescription}>
              Position your reading material clearly within the frame for best results.
            </Text>
            <Button
              mode="contained"
              style={styles.scanButton}
              onPress={navigateToCamera}
            >
              Open Camera
            </Button>
          </Card.Content>
        </Card>

        <Text variant="titleMedium" style={styles.tipsTitle}>
          Tips for Best Results
        </Text>

        <View style={styles.tipsContainer}>
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipTitle}>Good Lighting</Text>
            <Text style={styles.tipDescription}>Ensure there's enough light to clearly see the text.</Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>🔍</Text>
            <Text style={styles.tipTitle}>Proper Framing</Text>
            <Text style={styles.tipDescription}>Keep the text centered and fill the frame with the page.</Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>👤</Text>
            <Text style={styles.tipTitle}>Avoid Shadows</Text>
            <Text style={styles.tipDescription}>Try not to cast shadows on the page while scanning.</Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>📚</Text>
            <Text style={styles.tipTitle}>Flat Surface</Text>
            <Text style={styles.tipDescription}>Place books on a flat surface and hold pages down.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  mainCard: {
    marginBottom: 24,
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  cameraIcon: {
    fontSize: 60,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  scanButton: {
    paddingHorizontal: 24,
    backgroundColor: '#6200EE',
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tipTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
  },
  tipDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default ScanScreen; 