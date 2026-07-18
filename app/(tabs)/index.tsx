import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/Header';
import WelcomeCard from '@/components/WelcomeCard';
import StudentCard from '@/components/StudentCard';
import TodaySurveyCard from '@/components/TodaySurveyCard';
import QuickActionCard from '@/components/QuickActionCard';
import SurveySummary from '@/components/SurveySummary';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const quickActions: { title: string; icon: keyof typeof Ionicons.glyphMap; color: string; route: string }[] = [
    { title: 'New Survey', icon: 'add-circle', color: '#2b59ff', route: '/(tabs)/new-survey' },
    { title: 'Camera', icon: 'camera', color: '#ff3366', route: '/camera' },
    { title: 'Location', icon: 'location', color: '#00d2ff', route: '/location' },
    { title: 'Contacts', icon: 'people', color: '#8a2be2', route: '/contacts' },
    { title: 'Clipboard', icon: 'clipboard', color: '#ff8c00', route: '/clipboard' },
    { title: 'History', icon: 'time', color: '#0d8246', route: '/(tabs)/history' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        <WelcomeCard name="Rani Patel" />
        
        <StudentCard 
          name="Rani Patel" 
          rollNumber="ST-2026-042" 
          course="Field Engineering" 
          college="Tech University" 
        />
        
        <TodaySurveyCard total={15} />
        
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionCard 
                key={index}
                title={action.title}
                icon={action.icon}
                color={action.color}
                route={action.route}
              />
            ))}
          </View>
        </View>

        <SurveySummary />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  quickActionsSection: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1f36',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

