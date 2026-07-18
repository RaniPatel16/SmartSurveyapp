import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export default function Header() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.openDrawer()} style={styles.iconButton}>
        <Ionicons name="menu" size={28} color="#1a1f36" />
      </Pressable>
      
      <Text style={styles.title}>Dashboard</Text>
      
      <Pressable style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={24} color="#1a1f36" />
        <View style={styles.badge} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1f36',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3366',
  },
});
