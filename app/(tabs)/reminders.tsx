import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';

export default function Reminders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const reminders: Doc[] = [
    {
      id: '1',
      name: 'رخصة القيادة',
      description: 'ستنتهي قريباً',
      category: 'cards',
      expiryDate: '21/05/2025',
      documentName: '',
      imageBase64: '',
      size: '',
      mimeType: ''
    },
    {
      id: '2',
      name: 'تأمين السيارة',
      description: 'انتهت صلاحيتها',
      category: 'shopping',
      expiryDate: '01/01/2024',
      documentName: '',
      imageBase64: '',
      size: '',
      mimeType: ''
    },
    {
      id: '3',
      name: 'بطاقة الجامعة',
      description: 'سارية',
      category: 'wallet',
      expiryDate: '30/04/2026',
      documentName: '',
      imageBase64: '',
      size: '',
      mimeType: ''
    },
  ];

  const filteredReminders = reminders.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Search Header */}
      <View style={styles.header}>
        {isSearchVisible ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن تذكير..."
              placeholderTextColor="white"
              value={searchQuery}
              onChangeText={setSearchQuery}
              textAlign="right"
            />
            <TouchableOpacity
              onPress={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => setIsSearchVisible(true)}
          >
            <Ionicons name="search" size={24} color="#374151" />
          </TouchableOpacity>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* List of reminders */}
      <FlatList
        data={filteredReminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.name}
            description={item.description}
            expiryDate={item.expiryDate}
            iconPath={categories[item.category]}
            status={
              item.expiryDate === '01/01/2024'
                ? 'expired'
                : item.expiryDate === '21/05/2025'
                ? 'soon'
                : 'valid'
            }
          />
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#c2c3c4',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#374151',
  },
  closeSearchButton: {
    padding: 4,
  },
  searchIcon: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
});