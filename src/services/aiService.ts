import { detectDocumentType } from '../utils/helpers';

// Types to match our database service
interface AnalysisResult {
  summary: string;
  keywords: string[];
  quotes: string[];
  documentType: 'book' | 'magazine' | 'newspaper' | 'article' | 'other';
}

// Mock data for different document types
const mockResponses: Record<string, Omit<AnalysisResult, 'documentType'>> = {
  book: {
    summary: "This section of the book explores the character's journey through adversity, highlighting themes of resilience and self-discovery. The narrative follows a non-linear structure, jumping between past and present to reveal key motivations.",
    keywords: ["character development", "resilience", "narrative structure", "self-discovery", "internal conflict"],
    quotes: [
      "It was not the destination that mattered, but how the journey transformed him.",
      "In the silence between words, she found the truth she had been seeking.",
      "The past is never dead. It's not even past."
    ]
  },
  magazine: {
    summary: "The article discusses emerging trends in sustainable technology, focusing on innovations in renewable energy and eco-friendly manufacturing. It highlights companies pioneering these solutions and the economic impact of green initiatives.",
    keywords: ["sustainability", "renewable energy", "eco-friendly", "innovation", "green technology"],
    quotes: [
      "Sustainability is no longer optional but essential for business survival.",
      "The future of manufacturing lies in zero-waste processes.",
      "Green technology represents the largest economic opportunity of the 21st century."
    ]
  },
  newspaper: {
    summary: "The news report covers recent developments in international relations, focusing on diplomatic talks between major powers. It analyzes potential outcomes and implications for global stability and trade relationships.",
    keywords: ["international relations", "diplomacy", "global politics", "trade", "negotiations"],
    quotes: [
      "This diplomatic breakthrough represents a fundamental shift in relations.",
      "Analysts suggest this could reshape the geopolitical landscape.",
      "Sources close to the negotiations described the talks as 'tense but productive'."
    ]
  },
  article: {
    summary: "The research article examines the correlation between sleep patterns and cognitive performance in adults. It presents findings from a longitudinal study showing that consistent sleep schedules significantly improve memory and problem-solving abilities.",
    keywords: ["sleep patterns", "cognitive performance", "research", "memory", "neuroscience"],
    quotes: [
      "The data suggests a 42% improvement in recall tasks after sleep schedule normalization.",
      "Consistent sleep may be the single most undervalued cognitive enhancer.",
      "The research challenges previous assumptions about adult sleep requirements."
    ]
  },
  other: {
    summary: "This content presents information on various topics including historical events, personal reflections, and analytical observations. It combines factual information with interpretive elements.",
    keywords: ["information", "analysis", "reflection", "observation", "documentation"],
    quotes: [
      "The intersection of multiple perspectives reveals a more complete picture.",
      "Understanding requires both observation and reflection.",
      "Documentation serves as the foundation for future understanding."
    ]
  }
};

// Mock OCR text extraction - in real app, this would use a real OCR service
export const extractTextFromImage = async (imageUri: string): Promise<string> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock extracted text
  return "This is a sample extracted text that would normally come from OCR. The content would vary based on the actual image captured. In a real implementation, this would use a proper OCR service to extract text from the provided image.";
};

// Mock AI analysis - in real app, this would connect to a real AI model
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Detect document type from text
  const documentType = detectDocumentType(text);
  
  // Return mock analysis based on detected type
  return {
    ...mockResponses[documentType],
    documentType
  };
};

// Learn from user behavior - in real app, this would update AI model
export const learnFromUserBehavior = async (
  documentId: string, 
  userFeedback: 'like' | 'dislike', 
  customTags?: string[]
): Promise<void> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`AI learning from user feedback: ${userFeedback} for document ${documentId}`);
  if (customTags) {
    console.log(`User added tags: ${customTags.join(', ')}`);
  }
  
  // In a real implementation, this would update the AI model's parameters
  return;
}; 