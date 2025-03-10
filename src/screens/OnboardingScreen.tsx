import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Onboarding data
const onboardingData = [
  {
    id: '1',
    title: 'Welcome to SnapRead',
    description: 'Scan, summarize, and save your reading material in seconds with AI-powered insights.',
    icon: '📚',
  },
  {
    id: '2',
    title: 'Scan Anything',
    description: 'Books, magazines, articles, newspapers - just snap a picture and get a summary.',
    icon: '📷',
  },
  {
    id: '3',
    title: 'AI Summaries',
    description: 'Our AI creates concise summaries, extracts key concepts, and identifies memorable quotes.',
    icon: '🤖',
  },
  {
    id: '4',
    title: 'Track Your Reading',
    description: 'Build your personal library of scanned content and get insights into your reading habits.',
    icon: '📊',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  // Handle next page
  const goToNextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentPage + 1,
        animated: true,
      });
    } else {
      // Last page, go to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

  // Handle skip
  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  // On scroll end
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index);
    }
  }).current;

  // Render onboarding item
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        
        <Text variant="headlineMedium" style={styles.title}>
          {item.title}
        </Text>
        
        <Text variant="bodyLarge" style={styles.description}>
          {item.description}
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        {currentPage < onboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      
      <View style={styles.bottomContainer}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentPage ? '#6200EE' : '#E0E0E0' },
              ]}
            />
          ))}
        </View>
        
        {/* Next button */}
        <Button
          mode="contained"
          onPress={goToNextPage}
          style={styles.nextButton}
        >
          {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconContainer: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0E4FF',
    borderRadius: 60,
    marginBottom: 40,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#212121',
  },
  description: {
    textAlign: 'center',
    color: '#757575',
  },
  bottomContainer: {
    padding: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  nextButton: {
    paddingVertical: 8,
    backgroundColor: '#6200EE',
  },
});

export default OnboardingScreen; 