import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { Text, Card, Button, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../context/ThemeContext';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  
  // Mock settings
  const [notifications, setNotifications] = useState(true);
  const [saveScans, setSaveScans] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Profile & Settings" />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* User Info Section */}
        <Card style={styles.userCard}>
          <Card.Content style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SR</Text>
            </View>
            <View style={styles.userTextContainer}>
              <Text style={styles.userName}>SnapRead User</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Reading Stats */}
        <Card style={styles.statsCard}>
          <Card.Title title="Reading Statistics" />
          <Card.Content>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Documents</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Pages</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Keywords</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Card.Title title="App Settings" />
          <List.Section>
            <List.Item
              title="Dark Mode"
              description="Toggle between light and dark themes"
              right={() => (
                <Switch
                  value={theme.dark}
                  onValueChange={toggleTheme}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Notifications"
              description="Receive reminders and updates"
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Save Scans"
              description="Automatically save all your scans"
              right={() => (
                <Switch
                  value={saveScans}
                  onValueChange={setSaveScans}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Usage Analytics"
              description="Help us improve by sharing analytics"
              right={() => (
                <Switch
                  value={analytics}
                  onValueChange={setAnalytics}
                />
              )}
            />
          </List.Section>
        </Card>

        {/* Account Actions */}
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            style={styles.button}
            onPress={() => {}}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  userCard: {
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    opacity: 0.7,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  settingsCard: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    borderColor: '#6200EE',
  },
});

export default ProfileScreen; 