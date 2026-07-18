import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TodaySurveyCardProps {
  total: number;
}

export default function TodaySurveyCard({ total }: TodaySurveyCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Surveys</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total Surveys</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1f36',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: '#1a1f36',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 14,
    color: '#a0a8bb',
    marginTop: 8,
    fontWeight: '600',
  },
});
