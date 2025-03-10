import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  SummaryResult: {
    imageUri: string;
    summary?: string;
    keywords?: string[];
  };
  History: undefined;
  Profile: undefined;
  Subscription: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 