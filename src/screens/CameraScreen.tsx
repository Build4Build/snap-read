import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation';
import { Header } from '../components/Header';
import { StatusBar } from 'expo-status-bar';

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isReady, setIsReady] = useState(false);
  const cameraRef = useRef<Camera>(null);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Navigate back to home
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  // Take a picture and navigate to the result screen
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        // TODO: Implement actual processing
        // For now, navigate to a mock result
        navigation.navigate('SummaryResult', {
          imageUri: photo.uri,
          summary: "This is a placeholder for the document summary. In the real app, we would process the captured image using OCR and then generate a summary of the text content.",
          keywords: ["placeholder", "demo", "snapread"],
        });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  // Toggle between front and back camera
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  // Display permission denied message
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Header title="Camera" showBackButton onBackPress={navigateToHome} />
        <View style={styles.permissionContent}>
          <Text style={styles.permissionText}>
            Camera access denied. Please enable camera permissions in your device settings to use this feature.
          </Text>
          <Button 
            mode="contained" 
            style={styles.permissionButton} 
            onPress={navigateToHome}
          >
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // Display loading state
  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        onCameraReady={() => setIsReady(true)}
      >
        <SafeAreaView style={styles.cameraControls}>
          <View style={styles.topControls}>
            <IconButton
              icon="arrow-left"
              iconColor="white"
              size={24}
              onPress={navigateToHome}
              style={styles.backButton}
            />
            <IconButton
              icon="camera-flip"
              iconColor="white"
              size={24}
              onPress={toggleCameraType}
              style={styles.flipButton}
            />
          </View>
          
          <View style={styles.bottomControls}>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
              disabled={!isReady}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomControls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  permissionContainer: {
    flex: 1,
  },
  permissionContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#6200EE',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen; 