import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';
import { loadObject, saveObject, bytesToMB } from '@/utils/storage';

export default function MyDocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const data = await loadObject('documents');
      if (Array.isArray(data)) {
        setDocuments(data);
      }
      setLoading(false);
    };
    fetchDocuments();
  }, []); // ✅ fetch only once on mount

  const deleteDocument = async (id: string) => {
    Alert.alert("تأكيد الحذف", "هل تريد حذف هذا الملف؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        style: "destructive",
        onPress: async () => {
          const updated = documents.filter(doc => doc.id !== id);
          await saveObject('documents', updated);
          setDocuments(updated);
        },
      },
    ]);
  };

  const filteredDocs = documents.filter(doc =>
    doc.documentName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={[styles.container, { marginTop: 10, alignItems: 'center' }]}>
        <Text style={styles.title}>ما فيه شي ع البال :(</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Search Header */}
      <View style={styles.header}>
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

      {/* Divider */}
      <View style={styles.divider} />

      {/* Document List */}
      <FlatList
        data={filteredDocs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.documentName}
            description={item.description}
            iconPath={categories[item.category]}
            size={bytesToMB(item.size) + ' MB'}
            imageBase64={item.imageBase64}
            mimeType={item.mimeType}
            onDelete={() => deleteDocument(item.id)}
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
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  searchContainer: {
    flex: 1,
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
  searchIcon: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
    color: '#6B7280',
  },
});