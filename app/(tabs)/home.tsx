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

const recentDocs = [
  {
    id: 'r1',
    name: 'فاتورة الماء',
    size: '450 KB',
    iconPath: require('@/assets/icon_wallet.png'),
  },
  {
    id: 'r2',
    name: 'تقرير المدرسة',
    size: '1.2 MB',
    iconPath: require('@/assets/icon_cards.png'),
  },
];

const folders: Array<{ id: number; title: string; date: string; filesCount: number; color: 'orange' | 'blue' }> = [
  { id: 1, title: 'اغراض المنزل', date: 'April 19, 2025', filesCount: 10, color: 'orange' },
  { id: 2, title: 'الكترونيات', date: 'April 19, 2025', filesCount: 10, color: 'blue' },
  { id: 3, title: 'ملابس', date: 'April 19, 2025', filesCount: 8, color: 'orange' },
  { id: 4, title: 'اثاث', date: 'April 19, 2025', filesCount: 12, color: 'blue' }
];

export default function HomeScreen() {
  const [isGridView, setIsGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();

  const filteredDocs = recentDocs.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFolders = folders.filter(folder => 
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={filteredDocs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
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

              {isSearchVisible ? (
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="ابحث عن ملف أو مجلد..."
                    placeholderTextColor={'white'}
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

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}> المجلدات</Text>

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
            name={item.name}
            iconPath={item.iconPath}
            size={item.size}
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