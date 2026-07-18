import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Pressable, TextInput, Alert, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

export default function ContactsScreen() {
  const router = useRouter();
  
  // State definitions
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Fetch contacts function
  const fetchContacts = async () => {
    try {
      // 1. Request Permission
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access contacts was denied.');
        setPermissionGranted(false);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      
      setPermissionGranted(true);
      setErrorMsg(null);

      // 2. Fetch Contacts with phone numbers
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
      });

      if (data.length > 0) {
        setContacts(data);
        setFilteredContacts(data);
      } else {
        setContacts([]);
        setFilteredContacts([]);
      }
    } catch (error) {
      setErrorMsg('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchContacts();
  };

  // Search logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = contacts.filter((contact) => 
        contact.name?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  // Handle copy contact number
  const handleCopyNumber = async (contact: Contacts.Contact) => {
    const phoneNumber = contact.phoneNumbers && contact.phoneNumbers.length > 0 
      ? contact.phoneNumbers[0].number 
      : null;

    if (phoneNumber) {
      await Clipboard.setStringAsync(phoneNumber);
      Alert.alert('Copied!', `${contact.name}'s number has been copied to your clipboard.`);
    } else {
      Alert.alert('No Number', 'This contact does not have a phone number saved.');
    }
  };

  // Render individual contact item
  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    const firstLetter = item.name ? item.name.charAt(0).toUpperCase() : '?';
    const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 
      ? item.phoneNumbers[0].number 
      : 'No Number';
    const hasNumber = phoneNumber !== 'No Number';

    return (
      <View style={styles.contactItem}>
        {/* Avatar using First Letter */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
        
        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactName} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.contactNumber, !hasNumber && styles.noNumberText]}>
            {phoneNumber}
          </Text>
        </View>
        
        {/* Copy Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.copyButton, 
            !hasNumber && styles.copyButtonDisabled,
            pressed && hasNumber && styles.copyButtonPressed
          ]}
          onPress={() => handleCopyNumber(item)}
          disabled={!hasNumber}
        >
          <Ionicons name="copy-outline" size={18} color={hasNumber ? "#2b59ff" : "#a0a8bb"} />
        </Pressable>
      </View>
    );
  };

  // Render the empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={64} color="#a0a8bb" />
      <Text style={styles.emptyTitle}>No Contacts Found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery.trim() !== '' 
          ? `We couldn't find anyone matching "${searchQuery}"` 
          : 'Your contact list is empty or permission was denied.'}
      </Text>
      {(!permissionGranted && errorMsg) && (
        <Pressable style={styles.retryButton} onPress={fetchContacts}>
          <Text style={styles.retryButtonText}>Grant Permission</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1a1f36" />
          </Pressable>
          <Text style={styles.headerTitle}>Contacts</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#697386" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor="#a0a8bb"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#a0a8bb" />
            </Pressable>
          )}
        </View>
        
        {/* Contact Counter */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {filteredContacts.length} {filteredContacts.length === 1 ? 'Contact' : 'Contacts'}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2b59ff" />
            <Text style={styles.loadingText}>Loading Contacts...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredContacts}
            keyExtractor={(item, index) => item.id ? item.id : index.toString()}
            renderItem={renderItem}
            contentContainerStyle={filteredContacts.length === 0 ? styles.flexGrow : styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                tintColor="#2b59ff"
                colors={['#2b59ff']} // Android
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1a1f36',
  },
  clearButton: {
    padding: 4,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 13,
    color: '#697386',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#697386',
    fontWeight: '500',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2b59ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1f36',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: '#4f566b',
  },
  noNumberText: {
    color: '#a0a8bb',
    fontStyle: 'italic',
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonDisabled: {
    backgroundColor: '#f5f7fa',
  },
  copyButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#2b59ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
