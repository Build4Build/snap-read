import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import SummaryResultScreen from '../screens/SummaryResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { SubscriptionScreen } from '../screens/SubscriptionScreen';
import { useSubscription } from '../context/SubscriptionContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isSubscribed, remainingFreeScans } = useSubscription();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{
          headerShown: true,
          title: 'Scan Document',
        }}
      />
      <Stack.Screen 
        name="SummaryResult" 
        component={SummaryResultScreen}
        options={{
          headerShown: true,
          title: 'Summary',
        }}
      />
      <Stack.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          headerShown: true,
          title: 'Reading History',
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
      <Stack.Screen 
        name="Subscription" 
        component={SubscriptionScreen}
        options={{
          headerShown: true,
          title: 'Upgrade to Premium',
        }}
      />
    </Stack.Navigator>
  );
}; 