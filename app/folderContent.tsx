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
import { categories } from '@/utils/constant';

export default function FolderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Mock data for folder contents
  const [documents, setDocuments] = useState<Doc[]>([
    { 
      id: '1', 
      documentName: 'فاتورة الكهرباء', 
      description: '',
      category: 'documents',
      expiryDate: '',
      imageBase64: '',
      size: '2.5 MB'
    },
    { 
      id: '2', 
      documentName: 'عقد الإيجار', 
      description: '',
      category: 'documents',
      expiryDate: '',
      imageBase64: '',
      size: '1.8 MB'
    },
  ]);

  const filteredDocuments = documents.filter(doc => 
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folder = {
    id: 1,
    title: 'اغراض المنزل',
    date: 'April 19, 2025',
    filesCount: 10,
    color: 'orange' as const,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{folder.title}</Text>
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
            style={styles.searchIcon}
            onPress={() => setIsSearchVisible(true)}
          >
            <Ionicons name="search" size={24} color="#374151" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.folderInfo}>
        <View style={[styles.iconContainer, { backgroundColor: folder.color === 'orange' ? '#FFF7ED' : '#EEF6FF' }]}>
          <Ionicons 
            name="folder-outline" 
            size={24} 
            color={folder.color === 'orange' ? '#FB923C' : '#60A5FA'}
          />
        </View>
        <Text style={styles.folderMeta}>{folder.date} · {folder.filesCount} ملفات</Text>
      </View>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#c2c3c4',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 16,
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