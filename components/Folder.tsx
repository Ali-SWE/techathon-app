import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface FolderCardProps {
  title: string;
  filesCount: number;
  color?: 'orange' | 'blue';
  id: number;
}

const FolderCard = ({ title, filesCount, color = 'orange', isGridView, id }: FolderCardProps & { isGridView: boolean }) => {
  const router = useRouter();
  const folderColor = color === 'blue' ? '#EEF6FF' : '#FFF7ED';
  const iconColor = color === 'blue' ? '#60A5FA' : '#FB923C';

  return (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: "/folderContent",
        params: { id }
      })}
      style={[isGridView ? styles.gridCard : styles.listCard]}
    >
      <View style={[styles.cardContent, isGridView && styles.gridCardContent]}>
        <View style={[styles.leftSection, isGridView && styles.gridLeftSection]}>
          <View style={[styles.iconContainer, { backgroundColor: folderColor }]}>
            <Ionicons name="folder-outline" size={24} color={iconColor} />
          </View>
          <View style={[styles.folderInfo, isGridView && styles.gridFolderInfo]}>
            <Text style={[styles.folderTitle, isGridView && styles.gridFolderTitle]}>
              {title}
            </Text>
            <Text style={styles.folderMeta}>{filesCount} ملفات</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={(e) => {
            e.stopPropagation();
            // TODO: handle menu (rename/delete/etc.)
          }}
        >
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

interface FoldersSectionProps {
  isGridView: boolean;
  folders: Array<Omit<FolderCardProps, 'date'>>;
}

const FoldersSection = ({ isGridView, folders }: FoldersSectionProps) => {
  const displayedFolders = isGridView ? folders.slice(0, 4) : folders;

  return (
    <View style={styles.section}>
      {isGridView ? (
        <View style={styles.folderGridView}>
          {displayedFolders.map(folder => (
            <FolderCard 
              key={folder.id}
              id={folder.id}
              title={folder.title}
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
              id={folder.id}
              title={folder.title}
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
    marginBottom: 24,
  },
  folderListView: {
    paddingLeft: 16,
    gap: 12,
    flexDirection: 'row-reverse',
  },
  folderGridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
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
    justifyContent: 'center',
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
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  gridCardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  leftSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  gridLeftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
  },
  folderInfo: {
    gap: 2,
    alignItems: 'flex-end',
  },
  folderTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'right',
  },
  folderMeta: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  menuButton: {
    padding: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    gap: 3,
  },
  menuDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#9CA3AF',
  },
  gridFolderInfo: {
    alignItems: 'center',
  },
  gridFolderTitle: {
    textAlign: 'center',
  },
});

export default FoldersSection;