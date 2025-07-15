import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  SummaryResult: {
    imageUri: string;
    summary?: string;
    keywords?: string[];
    quotes?: string[];
    documentType?: 'book' | 'magazine' | 'newspaper' | 'article' | 'other';
    isProcessing?: boolean;
  };
  History: undefined;
  Profile: undefined;
  Subscription: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 