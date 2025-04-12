import { StyleSheet, View, FlatList } from 'react-native';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';

export default function Reminders() {
  const reminders: Doc[] = [
    {
      id: '1',
      name: 'رخصة القيادة',
      description: 'ستنتهي قريباً',
      category: 'cards',
      expiryDate: '21/05/2025',
    },
    {
      id: '2',
      name: 'تأمين السيارة',
      description: 'انتهت صلاحيتها',
      category: 'shopping',
      expiryDate: '01/01/2024',
    },
    {
      id: '3',
      name: 'بطاقة الجامعة',
      description: 'سارية',
      category: 'wallet',
      expiryDate: '30/04/2026',
    },
  ];

  return (
    <View style={[styles.container, { marginTop: 10 }]}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DocComponent
            id={item.id}
            name={item.name}
            description={item.description}
            expiryDate={item.expiryDate}
            iconPath={categories[item.category]}
            status={
              item.expiryDate === '01/01/2024'
                ? 'expired'
                : item.expiryDate === '21/05/2025'
                ? 'soon'
                : 'valid'
            }
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