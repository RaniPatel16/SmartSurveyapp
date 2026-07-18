import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomDropdownProps {
  label: string; // The label shown above the dropdown
  value: string; // The currently selected value
  options: string[]; // List of options to show in the dropdown
  onSelect: (value: string) => void; // Function to call when an option is selected
  error?: boolean; // Boolean to indicate if there's a validation error
}

export default function CustomDropdown({ label, value, options, onSelect, error }: CustomDropdownProps) {
  // State to control the visibility of the dropdown modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label for the dropdown field */}
      <Text style={styles.label}>{label}</Text>
      
      {/* The main button that opens the dropdown modal */}
      <Pressable 
        style={[styles.dropdownButton, error && styles.dropdownError]} 
        onPress={() => setModalVisible(true)}
      >
        {/* Display the selected value or a placeholder */}
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value || 'Select an option'}
        </Text>
        {/* Icon indicating it is a dropdown */}
        <Ionicons name="chevron-down" size={20} color="#697386" />
      </Pressable>

      {/* Modal that displays the list of options */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {/* FlatList to render the options efficiently */}
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.optionItem}
                  onPress={() => {
                    onSelect(item); // Update the selected value
                    setModalVisible(false); // Close the modal
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// Styles for the CustomDropdown component
const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Spacing below the component
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1f36',
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownError: {
    borderColor: '#ff3366', // Red border when there's an error
  },
  dropdownText: {
    fontSize: 15,
    color: '#1a1f36',
  },
  placeholderText: {
    color: '#a0a8bb', // Gray color for placeholder
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark background
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff', // White background for the options list
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: 300, // Limit height in case of many options
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5', // Separator between options
  },
  optionText: {
    fontSize: 16,
    color: '#1a1f36',
  },
});
