import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Pressable, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import CameraButton from '@/components/CameraButton'; 

export default function LocationScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    
    try {
      // 1. Request Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Location permission is blocked by your phone.');
        Alert.alert(
          'Permission Blocked',
          'Your phone is blocking Expo from accessing your real location. You must open your phone Settings and allow Location access.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
        setLoading(false);
        return;
      }

      // 2. Get Location Coordinates
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLocation);

      // 3. Get Reverse Geocoded Address
      let geocodedAddress = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      
      if (geocodedAddress.length > 0) {
        setAddress(geocodedAddress[0]);
      }
    } catch (error) {
      setErrorMsg('Failed to fetch real location. Make sure your phone GPS is turned on.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch location automatically on mount
  useEffect(() => {
    fetchLocation();
  }, []);

  const handleCopy = async () => {
    if (location && address) {
      const locationString = `Address: ${address.street || ''} ${address.city || ''}, ${address.region || ''} ${address.postalCode || ''}, ${address.country || ''}\nLatitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`;
      
      await Clipboard.setStringAsync(locationString);
      Alert.alert('Success', 'Location copied to clipboard!');
    }
  };

  const formattedAddress = address 
    ? `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''} ${address.country || ''}`.trim().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,\s*,/g, ',')
    : 'Address not available';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1a1f36" />
        </Pressable>
        <Text style={styles.headerTitle}>My Location</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.pageSubtitle}>Current site coordinates and address for the survey.</Text>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2b59ff" />
            <Text style={styles.loadingText}>Fetching GPS Location...</Text>
          </View>
        ) : errorMsg ? (
          <View style={styles.centerContainer}>
            <Ionicons name="warning" size={48} color="#ff3366" />
            <Text style={styles.errorText}>{errorMsg}</Text>
            <Pressable style={styles.retryButton} onPress={fetchLocation}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : location ? (
          <View style={styles.card}>
            {/* Map Icon Header */}
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="location" size={32} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Current Position</Text>
            </View>

            {/* Address Section */}
            <View style={styles.dataSection}>
              <Text style={styles.dataLabel}>Address</Text>
              <Text style={styles.dataValueAddress}>{formattedAddress}</Text>
            </View>

            <View style={styles.divider} />

            {/* Coordinates Section */}
            <View style={styles.row}>
              <View style={styles.dataSectionHalf}>
                <Text style={styles.dataLabel}>Latitude</Text>
                <Text style={styles.dataValue}>{location.coords.latitude.toFixed(6)}</Text>
              </View>
              <View style={styles.dataSectionHalf}>
                <Text style={styles.dataLabel}>Longitude</Text>
                <Text style={styles.dataValue}>{location.coords.longitude.toFixed(6)}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Accuracy Section */}
            <View style={styles.dataSection}>
              <Text style={styles.dataLabel}>Accuracy</Text>
              <Text style={styles.dataValue}>Within {location.coords.accuracy?.toFixed(2)} meters</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.actionButtonSecondary} onPress={fetchLocation}>
                <Ionicons name="refresh" size={20} color="#2b59ff" style={{ marginRight: 8 }} />
                <Text style={styles.actionButtonTextSecondary}>Refresh</Text>
              </Pressable>
              
              <Pressable style={styles.actionButtonPrimary} onPress={handleCopy}>
                <Ionicons name="copy" size={20} color="#ffffff" style={{ marginRight: 8 }} />
                <Text style={styles.actionButtonTextPrimary}>Copy</Text>
              </Pressable>
            </View>

          </View>
        ) : null}
      </View>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1f36',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#697386',
    marginBottom: 20,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#697386',
    fontWeight: '500',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ff3366',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2b59ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2b59ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#2b59ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1f36',
  },
  dataSection: {
    marginBottom: 16,
  },
  dataSectionHalf: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginBottom: 16,
  },
  dataLabel: {
    fontSize: 13,
    color: '#a0a8bb',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dataValueAddress: {
    fontSize: 16,
    color: '#1a1f36',
    fontWeight: '500',
    lineHeight: 24,
  },
  dataValue: {
    fontSize: 18,
    color: '#1a1f36',
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  actionButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eef2ff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonTextSecondary: {
    color: '#2b59ff',
    fontWeight: '700',
    fontSize: 16,
  },
  actionButtonPrimary: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2b59ff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2b59ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonTextPrimary: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
