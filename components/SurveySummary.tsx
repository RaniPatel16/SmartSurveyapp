import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSurveys, Survey } from '@/context/SurveyContext';
import { useRouter } from 'expo-router';

export default function SurveySummary() {
  const { surveys } = useSurveys();
  const router = useRouter();
  
  // Show only the 3 most recent surveys on the dashboard
  const recentSurveys = surveys.slice(0, 3);

  const renderItem = ({ item }: { item: Survey }) => (
    <Pressable 
      style={({pressed}) => [styles.surveyItem, pressed && { opacity: 0.7 }]}
      onPress={() => router.push(`/survey-preview?id=${item.id}`)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="location" size={20} color="#2b59ff" />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.surveyName}>{item.siteName}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.clientText}>{item.clientName}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#a0a8bb" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Surveys</Text>
      {recentSurveys.length > 0 ? (
        <FlatList
          data={recentSurveys}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false} // Since it will be inside a ScrollView
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No surveys created yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1f36',
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
  surveyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  surveyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1f36',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientText: {
    fontSize: 12,
    color: '#697386',
  },
  dot: {
    fontSize: 12,
    color: '#a0a8bb',
    marginHorizontal: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#697386',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#e3fce3',
  },
  statusPending: {
    backgroundColor: '#fff4e5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextCompleted: {
    color: '#0d8246',
  },
  statusTextPending: {
    color: '#c27910',
  },
  emptyText: {
    fontSize: 14,
    color: '#a0a8bb',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  }
});
