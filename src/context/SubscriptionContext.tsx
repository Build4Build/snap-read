import React, { createContext, useContext, useState, useEffect } from 'react';
import * as InAppPurchases from 'expo-in-app-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Subscription product IDs
const SUBSCRIPTION_PRODUCT_ID = 'com.snapread.app.premium';
const FREE_SCAN_LIMIT = 3;

interface SubscriptionContextType {
  isSubscribed: boolean;
  remainingFreeScans: number;
  purchaseSubscription: () => Promise<void>;
  restorePurchases: () => Promise<void>;
  incrementScanCount: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingFreeScans, setRemainingFreeScans] = useState(FREE_SCAN_LIMIT);

  useEffect(() => {
    initializePurchases();
    loadSubscriptionStatus();
  }, []);

  const initializePurchases = async () => {
    try {
      await InAppPurchases.connectAsync();
      await InAppPurchases.getProductsAsync([SUBSCRIPTION_PRODUCT_ID]);
      await InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK && results) {
          results.forEach(async (purchase) => {
            if (!purchase.acknowledged) {
              await InAppPurchases.finishTransactionAsync(purchase, true);
            }
            if (purchase.productId === SUBSCRIPTION_PRODUCT_ID) {
              setIsSubscribed(true);
              await AsyncStorage.setItem('isSubscribed', 'true');
            }
          });
        }
      });
    } catch (error) {
      console.error('Error initializing purchases:', error);
    }
  };

  const loadSubscriptionStatus = async () => {
    try {
      const subscribed = await AsyncStorage.getItem('isSubscribed');
      const scanCount = await AsyncStorage.getItem('scanCount');
      
      setIsSubscribed(subscribed === 'true');
      setRemainingFreeScans(FREE_SCAN_LIMIT - (parseInt(scanCount || '0')));
    } catch (error) {
      console.error('Error loading subscription status:', error);
    }
  };

  const purchaseSubscription = async () => {
    try {
      const purchaseResult = await InAppPurchases.purchaseItemAsync(SUBSCRIPTION_PRODUCT_ID);
      if (purchaseResult.responseCode === InAppPurchases.IAPResponseCode.OK && purchaseResult.results) {
        setIsSubscribed(true);
        await AsyncStorage.setItem('isSubscribed', 'true');
      }
    } catch (error) {
      console.error('Error purchasing subscription:', error);
      throw error;
    }
  };

  const restorePurchases = async () => {
    try {
      const purchaseHistory = await InAppPurchases.getPurchaseHistoryAsync();
      if (purchaseHistory.responseCode === InAppPurchases.IAPResponseCode.OK && purchaseHistory.results) {
        const hasSubscription = purchaseHistory.results.some(
          (purchase) => purchase.productId === SUBSCRIPTION_PRODUCT_ID
        );
        setIsSubscribed(hasSubscription);
        await AsyncStorage.setItem('isSubscribed', hasSubscription.toString());
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
      throw error;
    }
  };

  const incrementScanCount = async () => {
    try {
      const currentCount = await AsyncStorage.getItem('scanCount');
      const newCount = (parseInt(currentCount || '0') + 1).toString();
      await AsyncStorage.setItem('scanCount', newCount);
      setRemainingFreeScans(FREE_SCAN_LIMIT - parseInt(newCount));
    } catch (error) {
      console.error('Error incrementing scan count:', error);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        remainingFreeScans,
        purchaseSubscription,
        restorePurchases,
        incrementScanCount,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}; 