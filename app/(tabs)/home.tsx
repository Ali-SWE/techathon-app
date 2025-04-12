import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
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

export default function HomeScreen() {
  const [isGridView, setIsGridView] = useState(false);
  const router = useRouter();

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
        data={recentDocs}
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

              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="search" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <FoldersSection isGridView={isGridView} />

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TouchableOpacity onPress={() => router.push('/mydocuments')}>
                  <Text style={styles.showAllText}>اظهار الكل</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>آخر الملفات</Text>
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