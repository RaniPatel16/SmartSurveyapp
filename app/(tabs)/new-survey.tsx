import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomDropdown from '@/components/CustomDropdown';
import { useSurveys } from '@/context/SurveyContext';

export default function NewSurveyScreen() {
  const router = useRouter();
  const { addSurvey } = useSurveys();

  // Local state for the form fields
  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  // State to track if there are validation errors, so we can highlight empty required fields
  const [hasErrors, setHasErrors] = useState(false);

  // Array of options for the Priority dropdown
  const priorityOptions = ['High', 'Medium', 'Low'];

  // Function to handle form submission
  const handleSubmit = () => {
    // 1. Validate required fields (Site Name, Client Name, Priority, Date)
    if (!siteName.trim() || !clientName.trim() || !priority || !date.trim()) {
      setHasErrors(true);
      Alert.alert('Validation Error', 'Please fill in all required fields marked with *');
      return;
    }

    // 2. Clear error state if everything is valid
    setHasErrors(false);

    // 3. Store survey in global context
    const newSurvey = {
      id: Date.now().toString(),
      siteName: siteName.trim(),
      clientName: clientName.trim(),
      description: description.trim(),
      priority,
      date: date.trim(),
      notes: notes.trim(),
    };

    addSurvey(newSurvey);
    console.log('New Survey Saved to Context:', newSurvey);

    // 4. Show success alert and navigate back to Dashboard
    Alert.alert(
      'Success!', 
      'Your survey has been created successfully.',
      [
        { 
          text: 'OK', 
          onPress: () => {
            // Reset form (optional, as navigating away might unmount it anyway)
            setSiteName('');
            setClientName('');
            setDescription('');
            setPriority('');
            setDate('');
            setNotes('');
            // Navigate back to the Dashboard
            router.replace('/(tabs)/');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          
          {/* Header Title */}
          <Text style={styles.pageTitle}>Create New Survey</Text>
          <Text style={styles.pageSubtitle}>Please fill in the details for the new inspection.</Text>

          {/* Form Fields container */}
          <View style={styles.formContainer}>
            
            {/* Site Name Input (Required) */}
            <CustomInput 
              label="Site Name *"
              placeholder="e.g., Downtown Construction Site"
              value={siteName}
              onChangeText={setSiteName}
              error={hasErrors && !siteName.trim()}
            />

            {/* Client Name Input (Required) */}
            <CustomInput 
              label="Client Name *"
              placeholder="e.g., Acme Corporation"
              value={clientName}
              onChangeText={setClientName}
              error={hasErrors && !clientName.trim()}
            />

            {/* Description Input (Optional) */}
            <CustomInput 
              label="Description"
              placeholder="Brief description of the survey..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              style={[styles.multilineInput, hasErrors && !description && { borderColor: '#e5e7eb' }]} // Style override for multiline
            />

            {/* Priority Dropdown (Required) */}
            <CustomDropdown 
              label="Priority *"
              value={priority}
              options={priorityOptions}
              onSelect={setPriority}
              error={hasErrors && !priority}
            />

            {/* Date Picker Input (Required) - using text input as a simple fallback for date picker */}
            <CustomInput 
              label="Date *"
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
              error={hasErrors && !date.trim()}
            />

            {/* Notes Input (Optional) */}
            <CustomInput 
              label="Additional Notes"
              placeholder="Any extra details..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              style={styles.multilineInput}
            />

          </View>

          {/* Submit Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Survey</Text>
          </Pressable>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles for the New Survey screen
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1f36',
    marginTop: 10,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#697386',
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 24,
  },
  multilineInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1a1f36',
    height: 100, // Fixed height for multiline inputs
    textAlignVertical: 'top', // Ensure text starts at the top in Android
  },
  submitButton: {
    backgroundColor: '#2b59ff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2b59ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
