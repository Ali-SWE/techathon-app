import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'expo-router';
import { useRouter } from 'expo-router';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { loadObject, bytesToMB } from '@/utils/storage';
import { categories } from '@/utils/constant';
import { loadObject, bytesToMB } from '@/utils/storage';
import { categories } from '@/utils/constant';

export default function AllFilesScreen() {
export default function AllFilesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const data = await loadObject("documents");
      setDocuments(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    (doc.documentName || '').toLowerCase().includes(searchQuery.toLowerCase())
    (doc.documentName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>كل الملفات</Text>
          <Text style={styles.headerTitle}>كل الملفات</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Info */}
      <View style={styles.folderInfo}>
        <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
          <Ionicons name="document-text-outline" size={24} color="#0EA5E9" />
        </View>
        <Text style={styles.folderMeta}>{filteredDocuments.length} ملفات</Text>
        <Text style={styles.folderMeta}>{filteredDocuments.length} ملفات</Text>
      </View>

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

      {/* Files List */}
      <FlatList
        data={filteredDocuments}
        keyExtractor={(item, index) => item.id ? item.id.toString() : `doc-${index}`}
        keyExtractor={(item, index) => item.id ? item.id.toString() : `doc-${index}`}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.documentName}
            description={item.description}
            iconPath={
              categories[item.category]
                ? categories[item.category]
                : { uri: `data:image/jpeg;base64,${item.imageBase64}` }
            }
            size={bytesToMB(item.size) + ' MB'}
            imageBase64={item.imageBase64}
            mimeType={item.mimeType}
            expiryDate={item.expiryDate}
            status={item.status}
          />
        )}
            description={item.description}
            iconPath={
              categories[item.category]
                ? categories[item.category]
                : { uri: `data:image/jpeg;base64,${item.imageBase64}` }
            }
            size={bytesToMB(item.size) + ' MB'}
            imageBase64={item.imageBase64}
            mimeType={item.mimeType}
            expiryDate={item.expiryDate}
            status={item.status}
          />
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, backgroundColor: '#F9FAFB' },
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
  closeSearchButton: { padding: 4 },
  searchIcon: { padding: 6 },
  closeSearchButton: { padding: 4 },
  searchIcon: { padding: 6 },
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