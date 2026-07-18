import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { useSurveys, Survey } from '@/context/SurveyContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SurveyCard from '@/components/SurveyCard';

export default function HistoryScreen() {
  const { surveys, deleteSurvey } = useSurveys();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  const priorities = ['All', 'High', 'Medium', 'Low'];

  // Filter surveys based on search query AND priority
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = 
      survey.siteName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      survey.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = selectedPriority === 'All' || survey.priority === selectedPriority;

    return matchesSearch && matchesPriority;
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Survey',
      'Are you sure you want to permanently delete this survey?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteSurvey(id)
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Survey History</Text>
        <Text style={styles.pageSubtitle}>Search, filter, and manage all your saved surveys.</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#697386" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search site or client name..."
            placeholderTextColor="#a0a8bb"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
              <Ionicons name="close-circle" size={18} color="#a0a8bb" />
            </Pressable>
          )}
        </View>

        {/* Priority Filter Chips */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {priorities.map((priority) => (
              <Pressable
                key={priority}
                style={[
                  styles.filterChip,
                  selectedPriority === priority && styles.filterChipActive
                ]}
                onPress={() => setSelectedPriority(priority)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedPriority === priority && styles.filterChipTextActive
                ]}>
                  {priority}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* FlatList of Surveys */}
      {filteredSurveys.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={64} color="#a0a8bb" />
          <Text style={styles.emptyTitle}>No Surveys Found</Text>
          <Text style={styles.emptySubtitle}>
            {surveys.length === 0 
              ? "You haven't created any surveys yet." 
              : "No surveys match your search or filter."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredSurveys}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <SurveyCard 
              survey={item} 
              onPress={() => router.push(`/survey-preview?id=${item.id}`)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
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
    paddingBottom: 15,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1f36',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#697386',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1f36',
  },
  clearSearchBtn: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterScroll: {
    gap: 10,
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f7fa',
    borderWidth: 1,
    borderColor: '#e3e8f0',
  },
  filterChipActive: {
    backgroundColor: '#2b59ff',
    borderColor: '#2b59ff',
  },
  filterChipText: {
    fontSize: 14,
    color: '#4f566b',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1f36',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#697386',
    textAlign: 'center',
    lineHeight: 22,
  },
});
