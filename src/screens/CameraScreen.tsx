import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import { useSubscription } from '../context/SubscriptionContext';
import { RootStackNavigationProp } from '../types/navigation';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  const { isSubscribed, remainingFreeScans, incrementScanCount } = useSubscription();

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Take a picture and navigate to the result screen
  const takePicture = async () => {
    if (!cameraRef.current) return;

    // Check subscription status
    if (!isSubscribed && remainingFreeScans <= 0) {
      Alert.alert(
        'Upgrade to Premium',
        'You have reached your free scan limit. Upgrade to continue scanning documents.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Upgrade',
            onPress: () => navigation.navigate('Subscription'),
          },
        ]
      );
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });

      if (!isSubscribed) {
        await incrementScanCount();
      }

      // Navigate to processing screen with loading state
      navigation.navigate('SummaryResult', {
        imageUri: photo.uri,
        isProcessing: true,
      });
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Header title="Scan Document" showBackButton />
        <View style={styles.content}>
          <Text>Requesting camera permission...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Header title="Scan Document" showBackButton />
        <View style={styles.content}>
          <Text>No access to camera</Text>
          <Button onPress={() => navigation.navigate('Home')}>Go Back</Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header
        title="Scan Document"
        showBackButton
        onBackPress={() => navigation.navigate('Home')}
      />
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
        onCameraReady={() => setIsReady(true)}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <Text style={styles.instructions}>
            Position the document within the frame
          </Text>
          {!isSubscribed && (
            <Text style={styles.scanCount}>
              {remainingFreeScans} free scans remaining
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <IconButton
              icon="camera"
              size={40}
              iconColor="#fff"
              onPress={takePicture}
              disabled={!isReady}
              style={styles.captureButton}
            />
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  instructions: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  scanCount: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}); 