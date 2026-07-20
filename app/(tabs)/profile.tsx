import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const renderStat = (value: string, label: string) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderMenuRow = (icon: keyof typeof Ionicons.glyphMap, title: string, color: string, onPress: () => void) => (
    <Pressable 
      style={({pressed}) => [styles.menuRow, pressed && { opacity: 0.7 }]} 
      onPress={onPress}
    >
      <View style={styles.menuInfo}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#a0a8bb" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop' }} 
              style={styles.profileImage} 
            />
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={12} color="#fff" />
            </View>
          </View>
          <Text style={styles.userName}>Alex Fieldworker</Text>
          <Text style={styles.userRole}>Senior Surveyor</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {renderStat('142', 'Surveys')}
          <View style={styles.statDivider} />
          {renderStat('12', 'Pending')}
          <View style={styles.statDivider} />
          {renderStat('4.9', 'Rating')}
        </View>

        {/* Menu Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            {renderMenuRow('person-outline', 'Personal Information', '#2b59ff', () => {})}
            <View style={styles.divider} />
            {renderMenuRow('briefcase-outline', 'Work History', '#8a2be2', () => {})}
            <View style={styles.divider} />
            {renderMenuRow('card-outline', 'Payment Details', '#0d8246', () => {})}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            {renderMenuRow('settings-outline', 'Settings', '#ff8c00', () => router.push('/settings'))}
            <View style={styles.divider} />
            {renderMenuRow('notifications-outline', 'Notification Preferences', '#ff3366', () => {})}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2b59ff',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1f36',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#697386',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1f36',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#a0a8bb',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0f2f5',
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
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  menuInfo: {
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
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1f36',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginVertical: 12,
  },
});
