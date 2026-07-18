import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: boolean;
}

export default function CustomInput({ label, error, ...props }: CustomInputProps) {
  // Return a View that wraps the label and the TextInput
  return (
    <View style={styles.container}>
      {/* Display the input label above the text field */}
      <Text style={styles.label}>{label}</Text>
      {/* The actual TextInput component, applying error styles if validation fails */}
      <TextInput 
        style={[styles.input, error && styles.inputError]} 
        placeholderTextColor="#a0a8bb"
        {...props} 
      />
    </View>
  );
}

// Define the styles for the input component
const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Space below each input field
  },
  label: {
    fontSize: 14, // Label text size
    fontWeight: '600', // Semi-bold text
    color: '#1a1f36', // Dark blue-gray color
    marginBottom: 8, // Space between label and input
  },
  input: {
    backgroundColor: '#ffffff', // White background
    borderWidth: 1, // 1px border
    borderColor: '#e5e7eb', // Light gray border
    borderRadius: 12, // Rounded corners
    padding: 16, // Inner spacing
    fontSize: 15, // Text size inside input
    color: '#1a1f36', // Text color
  },
  inputError: {
    borderColor: '#ff3366', // Red border color when there is a validation error
  },
});
