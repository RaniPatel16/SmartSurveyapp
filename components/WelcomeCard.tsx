import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WelcomeCardProps {
  name: string;
}

export default function WelcomeCard({ name }: WelcomeCardProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <Text style={styles.date}>{currentDate}</Text>
          <Text style={styles.greeting}>Welcome, {name}!</Text>
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#697386',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1f36',
  },
});
