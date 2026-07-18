import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StudentCardProps {
  name: string;
  rollNumber: string;
  course: string;
  college: string;
}

export default function StudentCard({ name, rollNumber, course, college }: StudentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Student Information</Text>
      
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={18} color="#2b59ff" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="id-card" size={18} color="#2b59ff" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Roll Number</Text>
          <Text style={styles.value}>{rollNumber}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="book" size={18} color="#2b59ff" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Course</Text>
          <Text style={styles.value}>{course}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="school" size={18} color="#2b59ff" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>College</Text>
          <Text style={styles.value}>{college}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1f36',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#697386',
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#1a1f36',
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginVertical: 12,
    marginLeft: 48,
  },
});
