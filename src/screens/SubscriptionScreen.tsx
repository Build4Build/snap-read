import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, useTheme } from 'react-native-paper';
import { useSubscription } from '../context/SubscriptionContext';
import { useNavigation } from '@react-navigation/native';

export const SubscriptionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { isSubscribed, remainingFreeScans, purchaseSubscription, restorePurchases } = useSubscription();

  const handlePurchase = async () => {
    try {
      await purchaseSubscription();
      navigation.goBack();
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleRestore = async () => {
    try {
      await restorePurchases();
      if (isSubscribed) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Restore failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Upgrade to Premium
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Get unlimited document scanning and AI-powered summaries
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.featuresCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.featuresTitle}>
            Premium Features
          </Text>
          <View style={styles.featureItem}>
            <Text variant="bodyLarge">✓ Unlimited document scanning</Text>
          </View>
          <View style={styles.featureItem}>
            <Text variant="bodyLarge">✓ Advanced AI summaries</Text>
          </View>
          <View style={styles.featureItem}>
            <Text variant="bodyLarge">✓ Export summaries</Text>
          </View>
          <View style={styles.featureItem}>
            <Text variant="bodyLarge">✓ Reading analytics</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.pricingCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.pricingTitle}>
            Pricing
          </Text>
          <Text variant="headlineMedium" style={styles.price}>
            $4.99
            <Text variant="bodyLarge" style={styles.period}>/month</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.trial}>
            Start with {remainingFreeScans} free scans
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handlePurchase}
          style={styles.purchaseButton}
          labelStyle={styles.buttonLabel}
        >
          Subscribe Now
        </Button>
        <Button
          mode="outlined"
          onPress={handleRestore}
          style={styles.restoreButton}
        >
          Restore Purchases
        </Button>
      </View>

      <Text variant="bodySmall" style={styles.terms}>
        Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
        Payment will be charged to your Apple ID account at confirmation of purchase.
        Your account will be charged for renewal within 24 hours prior to the end of the current period.
        You can manage and turn off auto-renewal in your Apple ID account settings.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  featuresCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  featuresTitle: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pricingCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  pricingTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    textAlign: 'center',
    color: '#6200EE',
  },
  period: {
    opacity: 0.7,
  },
  trial: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  buttonContainer: {
    padding: 16,
  },
  purchaseButton: {
    marginBottom: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
  restoreButton: {
    paddingVertical: 8,
  },
  terms: {
    textAlign: 'center',
    margin: 16,
    opacity: 0.7,
  },
}); 