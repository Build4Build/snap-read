import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Process and save image
export const processAndSaveImage = async (uri: string): Promise<string | null> => {
  try {
    // Create app directory if it doesn't exist
    const appDir = `${FileSystem.documentDirectory}images/`;
    const dirInfo = await FileSystem.getInfoAsync(appDir);
    
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(appDir, { intermediates: true });
    }
    
    // Process image - in a real app we would use expo-image-manipulator to resize
    // For now, we just copy the image to our app directory
    
    // Save image to app directory
    const newUri = `${appDir}${generateId()}.jpg`;
    await FileSystem.copyAsync({ from: uri, to: newUri });
    
    return newUri;
  } catch (error) {
    console.error('Error processing image:', error);
    Alert.alert('Error', 'Failed to process image');
    return null;
  }
};

// Get file info
export const getFileInfo = async (uri: string): Promise<FileSystem.FileInfo> => {
  try {
    return await FileSystem.getInfoAsync(uri);
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
};

// Format date in a user-friendly way
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Extract document type from content (mock implementation)
export const detectDocumentType = (text: string): 'book' | 'magazine' | 'newspaper' | 'article' | 'other' => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('book') || lowerText.includes('chapter') || lowerText.includes('novel')) {
    return 'book';
  } else if (lowerText.includes('magazine') || lowerText.includes('issue') || lowerText.includes('monthly')) {
    return 'magazine';
  } else if (lowerText.includes('newspaper') || lowerText.includes('daily') || lowerText.includes('edition')) {
    return 'newspaper';
  } else if (lowerText.includes('article') || lowerText.includes('journal')) {
    return 'article';
  } else {
    return 'other';
  }
}; 