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
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DocComponent } from '@/components/DocComponent';
import FoldersSection from '@/components/Folder';
import { loadObject, bytesToMB } from '@/utils/storage';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';

// Folder list without date field
const folders: Array<{ id: number; title: string; filesCount: number; color: 'orange' | 'blue' }> = [
  { id: 1, title: 'اغراض المنزل', filesCount: 0, color: 'orange' },
  { id: 2, title: 'الكترونيات', filesCount: 0, color: 'blue' },
  { id: 3, title: 'ملابس', filesCount: 0, color: 'orange' },
  { id: 4, title: 'اثاث', filesCount: 0, color: 'blue' }
];

export default function HomeScreen() {
  const [isGridView, setIsGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [folderCounts, setFolderCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const data = await loadObject("documents");
      setDocuments(data);
      
      // Calculate file counts for each folder
      const counts: Record<number, number> = {};
      data.forEach(doc => {
        const folderId = folders.findIndex(f => f.title === doc.category) + 1;
        if (folderId > 0) {
          counts[folderId] = (counts[folderId] || 0) + 1;
        }
      });
      setFolderCounts(counts);
      
      setLoading(false);
    };
    fetchDocuments();
  }, [documents]);

  if (documents.length === 0) {
    return (
      <View style={[styles.container, { marginTop: 10, alignItems: 'center' }]}>
        <Text style={styles.title}>{"ما في شي ع البال:("}</Text>
      </View>
    );
  }

  const filteredDocs = documents.filter(doc =>
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFolders = folders.map(folder => ({
    ...folder,
    filesCount: folderCounts[folder.id] || 0
  })).filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={filteredDocs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {isSearchVisible ? (
                <View style={styles.searchContainer}>
                  <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() => {
                      setIsSearchVisible(false);
                      setSearchQuery('');
                    }}
                  >
                    <Ionicons name="close" size={24} color="#374151" />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="ابحث عن ملف أو مجلد..."
                    placeholderTextColor={'white'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    textAlign="right"
                  />
                  <Ionicons name="search" size={24} color="#374151" style={{ marginStart: 6 }} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={() => setIsSearchVisible(true)}
                >
                  <Ionicons name="search" size={24} color="#374151" />
                </TouchableOpacity>
              )}

              <View style={styles.viewToggle}>
                <TouchableOpacity
                  style={[styles.viewToggleButton, !isGridView && styles.viewToggleButtonActive]}
                  onPress={() => setIsGridView(false)}
                >
                  <Ionicons name="list" size={20} color={!isGridView ? '#3B82F6' : '#9CA3AF'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.viewToggleButton, isGridView && styles.viewToggleButtonActive]}
                  onPress={() => setIsGridView(true)}
                >
                  <Ionicons name="grid" size={20} color={isGridView ? '#3B82F6' : '#9CA3AF'} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>المجلدات</Text>
                <TouchableOpacity onPress={() => router.push('/myFolders')}>
                  <Text style={styles.showAllText}>اظهار الكل</Text>
                </TouchableOpacity>
              </View>
              <FoldersSection isGridView={isGridView} folders={filteredFolders} />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>آخر الملفات</Text>
                <TouchableOpacity onPress={() => router.push('/mydocuments')}>
                  <Text style={styles.showAllText}>اظهار الكل</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.documentName}
            description={item.description}
            iconPath={categories[item.category]}
            size={bytesToMB(item.size) + " MB"}
            imageBase64={item.imageBase64}
            mimeType={item.mimeType}
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#c2c3c4',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
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
  viewToggle: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  viewToggleButton: {
    padding: 8,
    borderRadius: 8,
  },
  viewToggleButtonActive: {
    backgroundColor: '#EBF5FF',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'right',
  },
  showAllText: {
    fontSize: 14,
    color: '#3B82F6',
  },
});