import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CameraButton from '@/components/CameraButton';

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);
  
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [captureTime, setCaptureTime] = useState<string | null>(null);

  // If permissions are still loading
  if (!permission || !mediaPermission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2b59ff" />
      </View>
    );
  }

  // If permissions are not granted
  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="camera-outline" size={64} color="#a0a8bb" />
        <Text style={styles.permissionText}>We need your permission to use the camera and save photos.</Text>
        <CameraButton 
          iconName="checkmark" 
          onPress={() => {
            requestPermission();
            requestMediaPermission();
          }} 
          style={styles.grantButton}
          color="#fff" 
        />
        <Text style={styles.grantText}>Grant Permissions</Text>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setPhotoUri(photo.uri);
          
          // Format current time
          const now = new Date();
          const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setCaptureTime(timeString);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture.');
      }
    }
  };

  const handleRetake = () => {
    setPhotoUri(null);
    setCaptureTime(null);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setPhotoUri(null);
            setCaptureTime(null);
          }
        },
      ]
    );
  };

  const handleSave = async () => {
    if (photoUri) {
      try {
        await MediaLibrary.saveToLibraryAsync(photoUri);
        Alert.alert('Success', 'Photo saved to your gallery successfully!');
        router.back();
      } catch (error) {
        Alert.alert('Error', 'Failed to save photo to gallery.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CameraButton 
          iconName="arrow-back" 
          size={24} 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>Site Camera</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        {!photoUri ? (
          // CAMERA VIEW
          <View style={styles.cameraContainer}>
            <CameraView 
              style={styles.camera} 
              ref={cameraRef}
              onCameraReady={() => setIsCameraReady(true)}
            >
              {!isCameraReady && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#ffffff" />
                  <Text style={styles.loadingText}>Initializing Camera...</Text>
                </View>
              )}
            </CameraView>
            
            {/* Camera Controls */}
            <View style={styles.controlsContainer}>
              <View style={styles.controlsRow}>
                <View style={{ flex: 1 }} />
                
                {/* Capture Button */}
                <View style={styles.captureButtonContainer}>
                  <CameraButton 
                    iconName="camera" 
                    size={36} 
                    onPress={takePicture} 
                    disabled={!isCameraReady}
                    style={styles.captureButton}
                  />
                </View>
                
                <View style={{ flex: 1 }} />
              </View>
            </View>
          </View>
        ) : (
          // PREVIEW VIEW
          <View style={styles.previewContainer}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            
            {/* Timestamp Overlay */}
            <View style={styles.timestampOverlay}>
              <Text style={styles.timestampText}>{captureTime}</Text>
            </View>
            
            {/* Preview Controls */}
            <View style={styles.previewControls}>
              <CameraButton 
                iconName="trash" 
                color="#ff3366"
                onPress={handleDelete} 
                style={styles.previewButton}
              />
              <CameraButton 
                iconName="refresh" 
                color="#ffffff"
                onPress={handleRetake} 
                style={styles.previewButton}
              />
              <CameraButton 
                iconName="checkmark" 
                color="#4ade80"
                onPress={handleSave} 
                style={styles.previewButton}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background for camera
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#1a1f36',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  grantButton: {
    backgroundColor: '#2b59ff',
    borderColor: '#2b59ff',
  },
  grantText: {
    color: '#ffffff',
    marginTop: 10,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#1a1f36',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  captureButtonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  timestampOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timestampText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  previewControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  previewButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
  },
});
