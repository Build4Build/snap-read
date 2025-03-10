import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { processAndSaveImage } from '../utils/helpers';

interface DocumentScannerProps {
  onCapture: (imageUri: string) => void;
  onCancel: () => void;
}

export const DocumentScanner: React.FC<DocumentScannerProps> = ({ onCapture, onCancel }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);

  // Take picture
  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      try {
        setIsCapturing(true);
        
        // Take photo - mock it for now since we don't have access to the camera API
        // In a real app, we would use: const photo = await cameraRef.current.takePictureAsync();
        
        // Mock a photo URI for demo purposes
        const mockPhotoUri = 'https://picsum.photos/800/600';
        
        // Process and save the image
        const savedUri = await processAndSaveImage(mockPhotoUri);
        
        if (savedUri) {
          onCapture(savedUri);
        } else {
          Alert.alert('Error', 'Failed to process the captured image');
          setIsCapturing(false);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
        setIsCapturing(false);
      }
    }
  };

  // If permissions not yet determined
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.text}>Requesting camera permissions...</Text>
      </View>
    );
  }

  // If permissions not granted
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera access is required to scan documents.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        <View style={styles.overlay}>
          {/* Cancel button */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onCancel}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          
          {/* Document frame guide */}
          <View style={styles.documentFrame} />
          
          {/* Capture button */}
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
          
          {/* Instructions */}
          <Text style={styles.instructions}>
            Position your document within the frame and take a picture
          </Text>
        </View>
      </CameraView>
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
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    margin: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: 200,
  },
  cancelButton: {
    backgroundColor: '#888',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 20,
  },
  documentFrame: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    height: '50%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    borderWidth: 3,
    borderColor: 'white',
  },
  instructions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}); 