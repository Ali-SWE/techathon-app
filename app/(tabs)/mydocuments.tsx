import React, { useEffect, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';
import { loadObject, bytesToMB } from '@/utils/storage';

// Mock data for documents
const documents = [
  {
    id: '1',
    name: 'فاتورة الماء',
    size: '450 KB',
    iconPath: require('@/assets/icon_wallet.png'),
  },
  {
    id: '2',
    name: 'تقرير المدرسة',
    size: '1.2 MB',
    iconPath: require('@/assets/icon_cards.png'),
  },
  // Add more documents as needed
];

export default function MyDocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();
  const [documents, setDocuments] = useState<Doc[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
      const fetchDocuments = async () => {
        setLoading(true); // Start loading state
        const data = await loadObject("documents")
        setDocuments(data); 
        setLoading(false); // End loading state
      };
      fetchDocuments();
    }, [documents]);
    
    if(documents.length == 0){
      return (
        <View style={[styles.container, { marginTop: 10, alignItems: 'center' }]}>
          <Text style={styles.title}>{"ما فيه شي ع البال:("}</Text>
      </View>
      )
    }

  const filteredDocs = documents.filter(doc => 
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المستندات</Text>
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

      <FlatList
        data={filteredDocs}
        keyExtractor={item => item.id}
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
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
  content: {
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
});