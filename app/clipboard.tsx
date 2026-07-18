import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useSurveys } from '@/context/SurveyContext';

export default function ClipboardScreen() {
  const router = useRouter();
  const { surveys } = useSurveys();
  
  // Local state for the workspace notes
  const [notes, setNotes] = useState('');

  // Grab the latest survey ID if it exists, otherwise use a default
  const latestSurveyId = surveys.length > 0 ? surveys[surveys.length - 1].id : 'SURV-001-DEMO';
  
  const handleCopy = async (textToCopy: string, label: string) => {
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert('Copied!', `${label} copied to clipboard successfully.`);
  };

  const handlePaste = async () => {
    const textFromClipboard = await Clipboard.getStringAsync();
    if (textFromClipboard) {
      setNotes((prevNotes) => prevNotes ? `${prevNotes}\n${textFromClipboard}` : textFromClipboard);
      Alert.alert('Pasted!', 'Text pasted into your notes.');
    } else {
      Alert.alert('Empty', 'Your clipboard is currently empty.');
    }
  };

  const handleClearClipboard = async () => {
    await Clipboard.setStringAsync('');
    setNotes(''); // Visually clear the workspace text area too
    Alert.alert('Cleared!', 'Clipboard and workspace have been successfully cleared.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1a1f36" />
        </Pressable>
        <Text style={styles.headerTitle}>Clipboard Tools</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageSubtitle}>Quickly copy assignment data or paste notes from your clipboard.</Text>

        {/* Copy Section Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#2b59ff' }]}>
              <Ionicons name="copy" size={24} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>Quick Copy</Text>
          </View>

          {/* Survey ID Row */}
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Survey ID</Text>
              <Text style={styles.rowValue}>{latestSurveyId}</Text>
            </View>
            <Pressable 
              style={({pressed}) => [styles.copyBtn, pressed && styles.btnPressed]}
              onPress={() => handleCopy(latestSurveyId, 'Survey ID')}
            >
              <Ionicons name="copy-outline" size={20} color="#2b59ff" />
            </Pressable>
          </View>

          <View style={styles.divider} />

          {/* Contact Number Row */}
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Contact Number</Text>
              <Text style={styles.rowValue}>+1 (555) 123-4567</Text>
            </View>
            <Pressable 
              style={({pressed}) => [styles.copyBtn, pressed && styles.btnPressed]}
              onPress={() => handleCopy('+1 (555) 123-4567', 'Contact Number')}
            >
              <Ionicons name="copy-outline" size={20} color="#2b59ff" />
            </Pressable>
          </View>

          <View style={styles.divider} />

          {/* Location Row */}
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Current Location</Text>
              <Text style={styles.rowValue}>40.7128° N, -74.0060° W</Text>
            </View>
            <Pressable 
              style={({pressed}) => [styles.copyBtn, pressed && styles.btnPressed]}
              onPress={() => handleCopy('40.7128, -74.0060', 'Location')}
            >
              <Ionicons name="copy-outline" size={20} color="#2b59ff" />
            </Pressable>
          </View>
        </View>

        {/* Paste Workspace Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#8a2be2' }]}>
              <Ionicons name="document-text" size={24} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>Notes Workspace</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Paste your notes here..."
              placeholderTextColor="#a0a8bb"
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.actionButtons}>
            <Pressable 
              style={({pressed}) => [styles.pasteButton, pressed && styles.btnPressed]} 
              onPress={handlePaste}
            >
              <Ionicons name="clipboard-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.pasteButtonText}>Paste Notes</Text>
            </Pressable>

            <Pressable 
              style={({pressed}) => [styles.clearButton, pressed && styles.btnPressed]} 
              onPress={handleClearClipboard}
            >
              <Ionicons name="trash-outline" size={20} color="#ff3366" style={{ marginRight: 8 }} />
              <Text style={styles.clearButtonText}>Clear Clipboard</Text>
            </Pressable>
          </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#697386',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1f36',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 13,
    color: '#a0a8bb',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1f36',
  },
  copyBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginVertical: 16,
  },
  inputContainer: {
    backgroundColor: '#f5f7fa',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1f36',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  pasteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8a2be2',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pasteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff0f3',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#ff3366',
    fontSize: 15,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
