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
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Folder {
  id: number;
  title: string;
  filesCount: number;
  color: 'orange' | 'blue';
}

export default function MyFoldersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([
    { id: 1, title: 'اغراض المنزل', filesCount: 10, color: 'orange' },
    { id: 2, title: 'الكترونيات', filesCount: 10, color: 'blue' },
    { id: 3, title: 'ملابس', filesCount: 8, color: 'orange' },
    { id: 4, title: 'اثاث', filesCount: 12, color: 'blue' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const filteredFolders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: Date.now(),
        title: newFolderName,
        filesCount: 0,
        color: Math.random() > 0.5 ? 'orange' : 'blue'
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setIsModalVisible(false);
    }
  };

  const handleDeleteFolder = (folderId: number) => {
    Alert.alert(
      'حذف المجلد',
      'هل أنت متأكد من حذف هذا المجلد؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => setFolders(folders.filter(f => f.id !== folderId))
        }
      ]
    );
  };

  const handleRenameFolder = (folder: Folder) => {
    setEditingFolder(folder);
    setNewFolderName(folder.title);
    setIsModalVisible(true);
  };

  const handleUpdateFolder = () => {
    if (editingFolder && newFolderName.trim()) {
      setFolders(folders.map(f =>
        f.id === editingFolder.id
          ? { ...f, title: newFolderName }
          : f
      ));
      setEditingFolder(null);
      setNewFolderName('');
      setIsModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>كل المجلدات</Text>
        {isSearchVisible ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن مجلد..."
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
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => setIsSearchVisible(true)}
            >
              <Ionicons name="search" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setEditingFolder(null);
                setNewFolderName('');
                setIsModalVisible(true);
              }}
            >
              <Ionicons name="add" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={filteredFolders}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.folderCard, { backgroundColor: item.color === 'blue' ? '#EEF6FF' : '#FFF7ED' }]}
            onPress={() => router.push({ pathname: "/folderContent", params: { id: item.id } })}
          >
            <View style={styles.folderContent}>
              <View style={styles.folderInfo}>
                <View style={[styles.iconContainer, { backgroundColor: item.color === 'blue' ? '#60A5FA' : '#FB923C' }]}>
                  <Ionicons name="folder-outline" size={24} color="white" />
                </View>
                <View>
                  <Text style={styles.folderTitle}>{item.title}</Text>
                  <Text style={styles.folderMeta}>{item.filesCount} ملفات</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={(e) => {
                  e.stopPropagation();
                  Alert.alert(
                    'خيارات المجلد',
                    '',
                    [
                      { text: 'إعادة تسمية', onPress: () => handleRenameFolder(item) },
                      { text: 'حذف', style: 'destructive', onPress: () => handleDeleteFolder(item.id) },
                      { text: 'إلغاء', style: 'cancel' }
                    ]
                  );
                }}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingFolder ? 'إعادة تسمية المجلد' : 'إضافة مجلد جديد'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="اسم المجلد"
              value={newFolderName}
              onChangeText={setNewFolderName}
              textAlign="right"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  setNewFolderName('');
                  setEditingFolder(null);
                }}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={editingFolder ? handleUpdateFolder : handleAddFolder}
              >
                <Text style={styles.confirmButtonText}>
                  {editingFolder ? 'حفظ' : 'إضافة'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  headerRight: { flexDirection: 'row-reverse', gap: 16 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#c2c3c4',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  searchInput: { flex: 1, height: 40, fontSize: 16, color: '#374151' },
  closeSearchButton: { padding: 4 },
  searchIcon: { padding: 6 },
  addButton: { padding: 6 },
  content: { padding: 16 },
  folderCard: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 1,
  },
  folderContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  folderInfo: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  iconContainer: { padding: 12, borderRadius: 12 },
  folderTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  folderMeta: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  menuButton: { padding: 4 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white', borderRadius: 16, padding: 24, width: '90%'
  },
  modalTitle: {
    fontSize: 18, fontWeight: '600', color: '#111827',
    textAlign: 'right', marginBottom: 16
  },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8,
    padding: 12, fontSize: 16, marginBottom: 16
  },
  modalButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  cancelButton: { backgroundColor: '#F3F4F6' },
  confirmButton: { backgroundColor: '#3B82F6' },
  cancelButtonText: { color: '#374151', fontSize: 16, fontWeight: '500' },
  confirmButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },
});