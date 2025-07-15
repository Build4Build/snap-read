import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types locally since we're having issues with imports
export interface ScannedDocument {
  id: string;
  title?: string;
  imageUri: string;
  createdAt: Date;
  type?: 'book' | 'magazine' | 'newspaper' | 'article' | 'other';
  tags?: string[];
}

export interface Summary {
  id: string;
  documentId: string;
  text: string;
  keywords: string[];
  quotes: string[];
  createdAt: Date;
}

// Storage keys
const DOCUMENTS_KEY = '@snap_read_documents';
const SUMMARIES_KEY = '@snap_read_summaries';

// Initialize database - for AsyncStorage, this is just a placeholder
export const initDatabase = async (): Promise<void> => {
  try {
    console.log('Database initialized with AsyncStorage');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Document operations
export const saveDocument = async (document: ScannedDocument): Promise<void> => {
  try {
    const existingDocuments = await getDocuments();
    const updatedDocuments = [...existingDocuments, document];
    await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updatedDocuments));
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

export const getDocuments = async (): Promise<ScannedDocument[]> => {
  try {
    const documentsJson = await AsyncStorage.getItem(DOCUMENTS_KEY);
    if (!documentsJson) return [];
    
    const documents = JSON.parse(documentsJson);
    return documents.map((doc: any) => ({
      ...doc,
      createdAt: new Date(doc.createdAt)
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

export const getDocumentById = async (id: string): Promise<ScannedDocument | null> => {
  try {
    const documents = await getDocuments();
    return documents.find(doc => doc.id === id) || null;
  } catch (error) {
    console.error('Error getting document by ID:', error);
    return null;
  }
};

export const deleteDocument = async (id: string): Promise<void> => {
  try {
    const documents = await getDocuments();
    const filteredDocuments = documents.filter(doc => doc.id !== id);
    await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(filteredDocuments));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Summary operations
export const saveSummary = async (summary: Summary): Promise<void> => {
  try {
    const existingSummaries = await getSummaries();
    const updatedSummaries = [...existingSummaries, summary];
    await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(updatedSummaries));
  } catch (error) {
    console.error('Error saving summary:', error);
    throw error;
  }
};

export const getSummaries = async (): Promise<Summary[]> => {
  try {
    const summariesJson = await AsyncStorage.getItem(SUMMARIES_KEY);
    return summariesJson ? JSON.parse(summariesJson) : [];
  } catch (error) {
    console.error('Error getting summaries:', error);
    return [];
  }
};

export const getSummariesByDocumentId = async (documentId: string): Promise<Summary[]> => {
  try {
    const summaries = await getSummaries();
    return summaries.filter(summary => summary.documentId === documentId);
  } catch (error) {
    console.error('Error getting summaries by document ID:', error);
    return [];
  }
};

// Helper functions
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DOCUMENTS_KEY);
    await AsyncStorage.removeItem(SUMMARIES_KEY);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

export const exportData = async (): Promise<{ documents: ScannedDocument[]; summaries: Summary[] }> => {
  try {
    const documents = await getDocuments();
    const summaries = await getSummaries();
    return { documents, summaries };
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
}; 