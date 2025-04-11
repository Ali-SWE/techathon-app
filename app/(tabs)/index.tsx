import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FoldersSection from '../../components/Folder';

// Placeholder component for the Files section
const RecentFilesSection: React.FC = () => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>آخر الملفات</Text>
        <TouchableOpacity>
          <Text style={styles.showAllText}>اظهار الكل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [isGridView, setIsGridView] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      

      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>أهلا هاشم!</Text>
        <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
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
      </View>
        <FoldersSection isGridView={isGridView} />
        
        <RecentFilesSection />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white'
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500'
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  content: {
    flex: 1,
    padding: 16
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  showAllText: {
    fontSize: 14,
    color: '#3B82F6'
  },
  filesPlaceholder: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    color: '#6B7280'
  }
});