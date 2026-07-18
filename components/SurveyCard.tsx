import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Survey } from '@/context/SurveyContext';

interface SurveyCardProps {
  survey: Survey;
  onPress: () => void;
  onDelete: () => void;
}

export default function SurveyCard({ survey, onPress, onDelete }: SurveyCardProps) {
  return (
    <View style={styles.cardWrapper}>
      <Pressable 
        style={({pressed}) => [styles.cardContainer, pressed && styles.cardPressed]}
        onPress={onPress}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={24} color="#2b59ff" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.surveyName} numberOfLines={1}>{survey.siteName}</Text>
            <Text style={styles.clientText} numberOfLines={1}>{survey.clientName}</Text>
          </View>
          
          {/* Delete Button */}
          <Pressable 
            hitSlop={10}
            style={({pressed}) => [styles.deleteButton, pressed && { opacity: 0.5 }]}
            onPress={onDelete}
          >
            <Ionicons name="trash-outline" size={20} color="#ff3366" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <View style={styles.detailsRow}>
            <View style={[
              styles.priorityBadge, 
              survey.priority === 'High' ? styles.badgeHigh : survey.priority === 'Medium' ? styles.badgeMedium : styles.badgeLow
            ]}>
              <Text style={[
                styles.priorityText,
                survey.priority === 'High' ? styles.textHigh : survey.priority === 'Medium' ? styles.textMedium : styles.textLow
              ]}>{survey.priority}</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.dateText}>{survey.date}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#a0a8bb" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  surveyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1f36',
    marginBottom: 4,
  },
  clientText: {
    fontSize: 14,
    color: '#697386',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#fff0f3',
    borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeHigh: { backgroundColor: '#ffe5ec' },
  badgeMedium: { backgroundColor: '#fff3cd' },
  badgeLow: { backgroundColor: '#eef2ff' },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  textHigh: { color: '#ff3366' },
  textMedium: { color: '#ff8c00' },
  textLow: { color: '#2b59ff' },
  dot: {
    color: '#a0a8bb',
    marginHorizontal: 8,
    fontSize: 16,
  },
  dateText: {
    fontSize: 13,
    color: '#a0a8bb',
    fontWeight: '600',
  },
});
