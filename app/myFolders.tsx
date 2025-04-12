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
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { loadObject, saveObject } from '@/utils/storage';
import { Doc } from '@/utils/types';

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
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const data = await loadObject("documents");
      setDocuments(data);

      const categoryMap: Record<string, Folder> = {};
      data.forEach(doc => {
        if (!categoryMap[doc.category]) {
          categoryMap[doc.category] = {
            id: Date.now() + Object.keys(categoryMap).length,
            title: doc.category,
            filesCount: 1,
            color: Math.random() > 0.5 ? 'orange' : 'blue'
          };
        } else {
          categoryMap[doc.category].filesCount += 1;
        }
      });

      setFolders(Object.values(categoryMap));
      setLoading(false);
    };
    fetchDocuments();
  }, []);

  const handleUpdateFolder = async () => {
    if (editingFolder && newFolderName.trim()) {
      const updatedFolders = folders.map(f =>
        f.id === editingFolder.id ? { ...f, title: newFolderName } : f
      );

      const updatedDocuments = documents.map(doc =>
        doc.category === editingFolder.title ? { ...doc, category: newFolderName } : doc
      );

      setFolders(updatedFolders);
      setDocuments(updatedDocuments);
      await saveObject("documents", updatedDocuments);
      setEditingFolder(null);
      setNewFolderName('');
      setIsModalVisible(false);
    }
  };

  const filteredFolders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <TouchableOpacity onPress={() => { setIsSearchVisible(false); setSearchQuery(''); }}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsSearchVisible(true)}>
            <Ionicons name="search" size={24} color="#374151" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredFolders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.folderCard, { backgroundColor: item.color === 'blue' ? '#EEF6FF' : '#FFF7ED' }]}
            onPress={() => router.push({ pathname: "/folderContent", params: { id: item.id } })}
          >
            <View style={styles.folderInfo}>
              <View style={[styles.iconContainer, { backgroundColor: item.color === 'blue' ? '#60A5FA' : '#FB923C' }]}> 
                <Ionicons name="folder-outline" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.folderTitle}>{item.title}</Text>
                <Text style={styles.folderMeta}>{item.filesCount} ملفات</Text>
              </View>
              <TouchableOpacity onPress={() => {
                Alert.alert('خيارات المجلد', '', [
                  { text: 'إعادة تسمية', onPress: () => { setEditingFolder(item); setNewFolderName(item.title); setIsModalVisible(true); } },
                  { text: 'إلغاء', style: 'cancel' }
                ]);
              }}>
                <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.content}
      />

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingFolder ? 'إعادة تسمية المجلد' : 'إضافة مجلد جديد'}</Text>
            <TextInput
              style={styles.input}
              placeholder="اسم المجلد"
              value={newFolderName}
              onChangeText={setNewFolderName}
              textAlign="right"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => { setIsModalVisible(false); setNewFolderName(''); setEditingFolder(null); }}>
                <Text style={{ color: '#374151' }}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateFolder}>
                <Text style={{ color: '#3B82F6' }}>حفظ</Text>
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
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  searchContainer: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#c2c3c4', borderRadius: 8, paddingHorizontal: 12 },
  searchInput: { flex: 1, height: 40, fontSize: 16, color: '#374151' },
  folderCard: { padding: 16, borderRadius: 12, marginBottom: 12 },
  folderInfo: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  iconContainer: { padding: 10, borderRadius: 10 },
  folderTitle: { fontSize: 16, fontWeight: '500', color: '#111827' },
  folderMeta: { fontSize: 14, color: '#6B7280' },
  content: { padding: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 12, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: '600', textAlign: 'right', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 12 },
  modalButtons: { flexDirection: 'row-reverse', justifyContent: 'flex-end', gap: 12 },
});