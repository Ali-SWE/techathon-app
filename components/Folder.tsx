import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FolderCardProps {
  title: string;
  date: string;
  filesCount: number;
  color?: 'orange' | 'blue';
}

const FolderCard = ({ title, date, filesCount, color = 'orange', isGridView }: FolderCardProps & { isGridView: boolean }) => {
  const folderColor = color === 'blue' ? '#EEF6FF' : '#FFF7ED';
  const iconColor = color === 'blue' ? '#60A5FA' : '#FB923C';
  
  return (
    <View style={[
      isGridView ? styles.gridCard : styles.listCard
    ]}>
      <View style={[styles.cardContent, isGridView && styles.gridCardContent]}>
        <View style={[styles.leftSection, isGridView && styles.gridLeftSection]}>
          <View style={[styles.iconContainer, { backgroundColor: folderColor }]}>
            <Ionicons name="folder-outline" size={24} color={iconColor} />
          </View>
          <View style={[styles.folderInfo, isGridView && styles.gridFolderInfo]}>
            <Text style={[styles.folderTitle, isGridView && styles.gridFolderTitle]}>{title}</Text>
            <Text style={styles.folderMeta}>{date} · {filesCount} ملفات</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface FoldersSectionProps {
  isGridView: boolean;
}

const FoldersSection = ({ isGridView }: FoldersSectionProps) => {
  const folders: Array<FolderCardProps & { id: number }> = [
    { id: 1, title: 'اغراض المنزل', date: 'April 19, 2025', filesCount: 10, color: 'orange' },
    { id: 2, title: 'الكترونيات', date: 'April 19, 2025', filesCount: 10, color: 'blue' },
    { id: 3, title: 'ملابس', date: 'April 19, 2025', filesCount: 8, color: 'orange' },
    { id: 4, title: 'اثاث', date: 'April 19, 2025', filesCount: 12, color: 'blue' }
  ];

  const displayedFolders = isGridView ? folders.slice(0, 4) : folders;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>كل المجلدات</Text>
        <TouchableOpacity>
          <Text style={styles.showAllText}>اظهار الكل</Text>
        </TouchableOpacity>
      </View>
      {isGridView ? (
        <View style={styles.folderGridView}>
          {displayedFolders.map(folder => (
            <FolderCard 
              key={folder.id}
              title={folder.title} 
              date={folder.date} 
              filesCount={folder.filesCount}
              color={folder.color}
              isGridView={true}
            />
          ))}
        </View>
      ) : (
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.folderListView}
        >
          {displayedFolders.map(folder => (
            <FolderCard 
              key={folder.id}
              title={folder.title} 
              date={folder.date} 
              filesCount={folder.filesCount}
              color={folder.color}
              isGridView={false}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#6B7280'
  },
  showAllText: {
    fontSize: 14,
    color: '#3B82F6'
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
  folderListView: {
    paddingRight: 16,
    gap: 12
  },
  folderGridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 4
  },
  listCard: {
    width: 270,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    justifyContent: 'center'
  },
  gridCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  gridCardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 8
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  gridLeftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10
  },
  folderInfo: {
    gap: 2,
    alignItems: 'center'
  },
  folderTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center'
  },
  folderMeta: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center'
  },
  menuButton: {
    padding: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    gap: 3
  },
  menuDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#9CA3AF'
  },
  gridFolderInfo: {
    alignItems: 'center'
  },
  gridFolderTitle: {
    textAlign: 'center'
  }
});

export default FoldersSection;