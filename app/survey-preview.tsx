import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSurveys, Survey } from '@/context/SurveyContext';

export default function SurveyPreviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { surveys } = useSurveys();

  // Find the specific survey by ID, or fallback to the latest one if no ID provided
  const latestSurvey: Survey | null = id 
    ? (surveys.find(s => s.id === id) || null)
    : (surveys.length > 0 ? surveys[0] : null);

  // Safe fallback values if certain fields are missing
  const siteName = latestSurvey?.siteName || 'Unknown Site';
  const clientName = latestSurvey?.clientName || 'Unknown Client';
  const description = latestSurvey?.description || 'No description provided.';
  const priority = latestSurvey?.priority || 'Normal';
  const notes = latestSurvey?.notes || 'No additional notes.';
  const date = latestSurvey?.date || new Date().toISOString().split('T')[0];
  
  // Simulated rich data for preview if real data isn't provided yet
  const contact = latestSurvey?.contactNumber || '+1 (555) 019-8472';
  const latitude = latestSurvey?.latitude || 40.7128;
  const longitude = latestSurvey?.longitude || -74.0060;
  const address = latestSurvey?.address || '123 Site Avenue, New York, NY';
  
  // Dummy image for visual preview if no real photo was taken
  const photoUri = latestSurvey?.photoUri || 'https://images.unsplash.com/photo-1541888081622-108bba078657?q=80&w=600&auto=format&fit=crop';

  const handleSubmit = () => {
    Alert.alert(
      'Submit Survey',
      'Are you sure you want to finalize and submit this survey to the server?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          style: 'default',
          onPress: () => {
            Alert.alert('Success', 'Survey submitted successfully!');
            router.navigate('/(tabs)');
          }
        }
      ]
    );
  };

  const handleEdit = () => {
    // In a real flow, this might pass an ID to the edit form.
    // For now, we route back to the creation form.
    router.navigate('/(tabs)/new-survey');
  };

  const renderDataRow = (label: string, value: string | number, icon: keyof typeof Ionicons.glyphMap) => (
    <View style={styles.dataRow}>
      <View style={styles.dataLabelContainer}>
        <Ionicons name={icon} size={16} color="#a0a8bb" style={styles.dataIcon} />
        <Text style={styles.dataLabel}>{label}</Text>
      </View>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );

  if (!latestSurvey) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1a1f36" />
          </Pressable>
          <Text style={styles.headerTitle}>Survey Preview</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color="#a0a8bb" />
          <Text style={styles.emptyText}>No survey data available to preview.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1a1f36" />
        </Pressable>
        <Text style={styles.headerTitle}>Survey Preview</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Single Comprehensive Summary Card */}
        <View style={styles.card}>
          
          <View style={styles.cardBody}>
            {renderDataRow('Site Name', siteName, 'business-outline')}
            <View style={styles.divider} />
            {renderDataRow('Client Name', clientName, 'person-outline')}
            <View style={styles.divider} />
            {renderDataRow('Date', date, 'calendar-outline')}
            <View style={styles.divider} />
            
            {/* Priority */}
            <View style={styles.dataRow}>
              <View style={styles.dataLabelContainer}>
                <Ionicons name="flag-outline" size={16} color="#a0a8bb" style={styles.dataIcon} />
                <Text style={styles.dataLabel}>Priority</Text>
              </View>
              <View style={[
                styles.priorityBadge, 
                priority === 'High' ? styles.badgeHigh : priority === 'Medium' ? styles.badgeMedium : styles.badgeLow
              ]}>
                <Text style={[
                  styles.priorityText,
                  priority === 'High' ? styles.textHigh : priority === 'Medium' ? styles.textMedium : styles.textLow
                ]}>{priority}</Text>
              </View>
            </View>

            <View style={styles.divider} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.dataLabel}>Description</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>

            <View style={styles.divider} />
            {renderDataRow('Address', address, 'map-outline')}
            
            <View style={styles.divider} />
            <View style={styles.coordinatesRow}>
              <View style={styles.coordBox}>
                <Text style={styles.dataLabel}>Latitude</Text>
                <Text style={styles.dataValue}>{latitude.toFixed(6)}</Text>
              </View>
              <View style={styles.coordBox}>
                <Text style={styles.dataLabel}>Longitude</Text>
                <Text style={styles.dataValue}>{longitude.toFixed(6)}</Text>
              </View>
            </View>

            <View style={styles.divider} />
            {renderDataRow('Contact', contact, 'call-outline')}

            <View style={styles.divider} />
            <Text style={styles.dataLabel}>Photo</Text>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            
            <View style={styles.divider} />
            <Text style={styles.dataLabel}>Notes</Text>
            <Text style={styles.notesText}>{notes}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable 
            style={({pressed}) => [styles.editButton, pressed && styles.btnPressed]} 
            onPress={handleEdit}
          >
            <Ionicons name="create-outline" size={20} color="#2b59ff" style={{ marginRight: 8 }} />
            <Text style={styles.editButtonText}>Edit Survey</Text>
          </Pressable>

          <Pressable 
            style={({pressed}) => [styles.submitButton, pressed && styles.btnPressed]} 
            onPress={handleSubmit}
          >
            <Ionicons name="checkmark-done" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.submitButtonText}>Submit Survey</Text>
          </Pressable>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#a0a8bb',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1f36',
  },
  cardBody: {
    paddingTop: 8,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataIcon: {
    marginRight: 8,
  },
  dataLabel: {
    fontSize: 14,
    color: '#a0a8bb',
    fontWeight: '600',
  },
  dataValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1f36',
    maxWidth: '60%',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginVertical: 16,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeHigh: { backgroundColor: '#ffe5ec' },
  badgeMedium: { backgroundColor: '#fff3cd' },
  badgeLow: { backgroundColor: '#eef2ff' },
  priorityText: {
    fontSize: 13,
    fontWeight: '700',
  },
  textHigh: { color: '#ff3366' },
  textMedium: { color: '#ff8c00' },
  textLow: { color: '#2b59ff' },
  descriptionContainer: {
    marginTop: 4,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 15,
    color: '#4f566b',
    lineHeight: 22,
  },
  coordinatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordBox: {
    flex: 1,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginTop: 12,
    backgroundColor: '#f0f2f5',
  },
  notesText: {
    marginTop: 8,
    fontSize: 15,
    color: '#4f566b',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eef2ff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#2b59ff',
    fontSize: 16,
    fontWeight: '700',
  },
  submitButton: {
    flex: 1.5,
    flexDirection: 'row',
    backgroundColor: '#2b59ff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2b59ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
});
