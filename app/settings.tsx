import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  
  // Dummy states for the UI
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const renderSettingRow = (icon: keyof typeof Ionicons.glyphMap, title: string, value: boolean, onValueChange: (val: boolean) => void, color: string) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: '#e3e8f0', true: '#2b59ff' }}
        thumbColor={'#ffffff'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1a1f36" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.card}>
            {renderSettingRow('notifications', 'Push Notifications', notifications, setNotifications, '#2b59ff')}
            <View style={styles.divider} />
            {renderSettingRow('moon', 'Dark Mode', darkMode, setDarkMode, '#8a2be2')}
            <View style={styles.divider} />
            {renderSettingRow('location', 'Location Services', locationServices, setLocationServices, '#ff3366')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          <View style={styles.card}>
            <Pressable style={styles.linkRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: '#00d2ff15' }]}>
                  <Ionicons name="help-buoy" size={20} color="#00d2ff" />
                </View>
                <Text style={styles.settingTitle}>Help Center</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a0a8bb" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.linkRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: '#0d824615' }]}>
                  <Ionicons name="shield-checkmark" size={20} color="#0d8246" />
                </View>
                <Text style={styles.settingTitle}>Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#a0a8bb" />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#ff3366" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1f36',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#a0a8bb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1f36',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginVertical: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff0f3',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  logoutText: {
    color: '#ff3366',
    fontSize: 16,
    fontWeight: '700',
  },
});
