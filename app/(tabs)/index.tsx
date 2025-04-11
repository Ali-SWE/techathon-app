import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FoldersSection from '../../components/Folder';

// Placeholder component for the Files section
const RecentFilesSection: React.FC = () => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity>
          <Text style={styles.showAllText}>اظهار الكل</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>آخر الملفات</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [isGridView, setIsGridView] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeTitle}>أهلا هاشم!</Text>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#374151" />
          </TouchableOpacity>
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
        <FoldersSection isGridView={isGridView} />
        <RecentFilesSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'right'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 8
  },
  viewToggleButton: {
    padding: 8,
    borderRadius: 8
  },
  viewToggleButtonActive: {
    backgroundColor: '#EBF5FF'
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'right'
  },
  showAllText: {
    fontSize: 14,
    color: '#3B82F6'
  }
});