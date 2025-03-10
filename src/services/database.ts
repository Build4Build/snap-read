import { SQLiteDatabase, openDatabaseAsync } from 'expo-sqlite';

// Define types locally since we're having issues with imports
interface ScannedDocument {
  id: string;
  title?: string;
  imageUri: string;
  createdAt: Date;
  type?: 'book' | 'magazine' | 'newspaper' | 'article' | 'other';
  tags?: string[];
}

interface Summary {
  id: string;
  documentId: string;
  text: string;
  keywords: string[];
  quotes: string[];
  createdAt: Date;
}

// Document row type from database
interface DocumentRow {
  id: string;
  title: string | null;
  imageUri: string;
  createdAt: string;
  type: string | null;
  tags: string | null;
}

// Summary row type from database
interface SummaryRow {
  id: string;
  documentId: string;
  text: string;
  keywords: string;
  quotes: string;
  createdAt: string;
}

// Initialize database - will be done in initDatabase function
let db: SQLiteDatabase;

// Initialize database tables
export const initDatabase = async (): Promise<void> => {
  try {
    // Open database
    db = await openDatabaseAsync('snap_read.db');
    
    // Create documents table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        title TEXT,
        imageUri TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        type TEXT,
        tags TEXT
      );
    `);

    // Create summaries table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS summaries (
        id TEXT PRIMARY KEY,
        documentId TEXT NOT NULL,
        text TEXT NOT NULL,
        keywords TEXT NOT NULL,
        quotes TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (documentId) REFERENCES documents (id) ON DELETE CASCADE
      );
    `);

    // Create settings table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Document operations
export const saveDocument = async (document: ScannedDocument): Promise<void> => {
  try {
    // First prepare the statement
    const stmt = await db.prepareAsync(`
      INSERT OR REPLACE INTO documents (id, title, imageUri, createdAt, type, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    // Then execute it
    await stmt.executeAsync([
      document.id,
      document.title || null,
      document.imageUri,
      document.createdAt.toISOString(),
      document.type || null,
      document.tags ? JSON.stringify(document.tags) : null
    ]);
    
    // Finally, clean up
    await stmt.finalizeAsync();
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

export const getDocuments = async (): Promise<ScannedDocument[]> => {
  try {
    // First prepare the statement
    const stmt = await db.prepareAsync(`
      SELECT * FROM documents ORDER BY createdAt DESC
    `);
    
    // Then execute it
    const result = await stmt.executeAsync([]);
    
    // Get all rows
    const rows = await result.getAllAsync();
    
    // Finally, clean up
    await stmt.finalizeAsync();
    
    return rows.map(row => {
      // Cast to our row type
      const docRow = row as unknown as DocumentRow;
      return {
        id: docRow.id,
        title: docRow.title || undefined,
        imageUri: docRow.imageUri,
        createdAt: new Date(docRow.createdAt),
        type: docRow.type as ScannedDocument['type'] || undefined,
        tags: docRow.tags ? JSON.parse(docRow.tags) : []
      };
    });
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

// Summary operations
export const saveSummary = async (summary: Summary): Promise<void> => {
  try {
    // First prepare the statement
    const stmt = await db.prepareAsync(`
      INSERT OR REPLACE INTO summaries (id, documentId, text, keywords, quotes, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    // Then execute it
    await stmt.executeAsync([
      summary.id,
      summary.documentId,
      summary.text,
      JSON.stringify(summary.keywords),
      JSON.stringify(summary.quotes),
      summary.createdAt.toISOString()
    ]);
    
    // Finally, clean up
    await stmt.finalizeAsync();
  } catch (error) {
    console.error('Error saving summary:', error);
    throw error;
  }
};

export const getSummaryByDocumentId = async (documentId: string): Promise<Summary | null> => {
  try {
    // First prepare the statement
    const stmt = await db.prepareAsync(`
      SELECT * FROM summaries WHERE documentId = ?
    `);
    
    // Then execute it
    const result = await stmt.executeAsync([documentId]);
    
    // Get all rows
    const rows = await result.getAllAsync();
    
    // Finally, clean up
    await stmt.finalizeAsync();
    
    if (rows.length === 0) {
      return null;
    }
    
    // Cast to our row type
    const row = rows[0] as unknown as SummaryRow;
    
    return {
      id: row.id,
      documentId: row.documentId,
      text: row.text,
      keywords: JSON.parse(row.keywords),
      quotes: JSON.parse(row.quotes),
      createdAt: new Date(row.createdAt)
    };
  } catch (error) {
    console.error('Error getting summary:', error);
    return null;
  }
}; 