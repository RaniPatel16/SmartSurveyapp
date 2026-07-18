import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface QuickActionCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
}

export default function QuickActionCard({ title, icon, color, route }: QuickActionCardProps) {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.card} 
      onPress={() => {
        // Simple routing, since we might not have all paths defined yet, 
        // fallback logic can be added if needed.
        router.push(route as any);
      }}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#ffffff" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '30%',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1f36',
    textAlign: 'center',
  },
});
