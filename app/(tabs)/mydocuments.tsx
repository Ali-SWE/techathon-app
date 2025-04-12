import { StyleSheet, View, FlatList, Text} from 'react-native';
import { DocComponent } from '@/components/DocComponent';
import { useEffect, useState } from 'react';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';
import { loadObject, bytesToMB } from '@/utils/storage';


export default function MyDocuments() {
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
  
  return (
    <View style={[styles.container, { marginTop: 10 }]}>
      <FlatList
        data={documents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.documentName}
            description={item.description}
            iconPath={categories[item.category]}
            size={bytesToMB(item.size) + " MB"}
          />
        )}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
});