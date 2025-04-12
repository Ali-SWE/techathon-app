import { StyleSheet, View, FlatList } from 'react-native';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';

export default function MyDocuments() {
  const documents: Doc[] = [
    {
      id: "1",
      name: "تأمين السيارة",
      description: "التعاونية",
      category: "shopping",
      expiryDate: "11/04/2026"
    },
    {
      id: "2",
      name: "رخصة القيادة",
      description: "رخصتي",
      category: "cards",
      expiryDate: "21/05/2025"
    },
    {
      id: "3",
      name: "test document",
      description: "this document",
      category: "wallet",
      expiryDate: "11/04/2025"
    },
    {
      id: "4",
      name: "macbook",
      description: "",
      category: "electronics",
      expiryDate: "11/12/2028"
    }
  ];

  return (
    <View style={[styles.container, { marginTop: 10 }]}>
      <FlatList
        data={documents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.name}
            description={item.description}
            iconPath={categories[item.category]}
            size="2.1 MB"
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
});