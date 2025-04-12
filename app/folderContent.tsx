import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';

export default function FolderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [documents, setDocuments] = useState<Doc[]>([
    {
      id: '1',
      documentName: 'فاتورة الكهرباء',
      description: '',
      category: 'documents',
      expiryDate: '',
      imageBase64: '',
      size: '2.5 MB',
      mimeType: '',
      name: undefined
    },
    {
      id: '2',
      documentName: 'عقد الإيجار',
      description: '',
      category: 'documents',
      expiryDate: '',
      imageBase64: '',
      size: '1.8 MB',
      mimeType: '',
      name: undefined
    },
  ]);

  const filteredDocuments = documents.filter(doc =>
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folder = {
    id: 1,
    title: 'اغراض المنزل',
    filesCount: 10,
    color: 'orange' as const,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
          <Ionicons name="arrow-forward" size={24} color="#374151" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{folder.title}</Text>
        </View>

        <View style={{ width: 24 }} />
      </View>

      {/* Folder info */}
      <View style={styles.folderInfo}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: folder.color === 'orange' ? '#FFF7ED' : '#EEF6FF' }
        ]}>
          <Ionicons
            name="folder-outline"
            size={24}
            color={folder.color === 'orange' ? '#FB923C' : '#60A5FA'}
          />
        </View>
        <Text style={styles.folderMeta}>
          {folder.filesCount} <Text>ملفات</Text>
        </Text>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 16 }}>
        {isSearchVisible ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن ملف..."
              placeholderTextColor="white"
              value={searchQuery}
              onChangeText={setSearchQuery}
              textAlign="right"
            />
            <TouchableOpacity
              style={styles.closeSearchButton}
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
            style={[styles.searchIcon, { alignSelf: 'flex-end', marginBottom: 8 }]}
            onPress={() => setIsSearchVisible(true)}
          >
            <Ionicons name="search-outline" size={24} color="#374151" />
          </TouchableOpacity>
        )}
      </View>

      {/* Document list */}
      <FlatList
        data={filteredDocuments}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.documentName}
            iconPath={item.imageBase64}
            size={item.size}
          />
        )}
        keyExtractor={(item) => item.id}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  searchContainer: {
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
  folderInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
  },
  folderMeta: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    padding: 16,
  },
});