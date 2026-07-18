import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import { useSurveys, Survey } from '@/context/SurveyContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const { surveys } = useSurveys();
  const router = useRouter();

  const renderItem = ({ item }: { item: Survey }) => (
    <Pressable 
      style={({pressed}) => [styles.surveyItem, pressed && { opacity: 0.7 }]}
      onPress={() => router.push(`/survey-preview?id=${item.id}`)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={24} color="#2b59ff" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.surveyName}>{item.siteName}</Text>
        <Text style={styles.clientText}>{item.clientName}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.priorityText}>Priority: {item.priority}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#a0a8bb" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Survey History</Text>
        <Text style={styles.pageSubtitle}>All your saved surveys are listed here.</Text>
      </View>

      {surveys.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={64} color="#a0a8bb" />
          <Text style={styles.emptyText}>No surveys found.</Text>
        </View>
      ) : (
        <FlatList
          data={surveys}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1f36',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#697386',
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
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
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  surveyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1f36',
    marginBottom: 4,
  },
  clientText: {
    fontSize: 14,
    color: '#4f566b',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2b59ff',
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
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextCompleted: {
    color: '#0d8246',
  },
  statusTextPending: {
    color: '#c27910',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#a0a8bb',
    marginTop: 16,
    fontWeight: '500',
  },
});
