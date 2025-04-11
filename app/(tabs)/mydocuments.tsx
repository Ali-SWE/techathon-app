import { StyleSheet,View,  Image, Platform, FlatList, Text, TouchableOpacity} from 'react-native';
import { DocComponent } from '@/components/DocComponent';
import { Doc } from '@/utils/types';
import { categories } from '@/utils/constant';


export default function MyDocuments() {
  const documents: Doc[] = [] // this will be taken from the storage of the app in the device 
  documents.push({id: "1", name: "تأمين السيارة", description: "التعاونية", category: "shopping", expiryDate: "11/04/2025"}, {id: "2", name: "test document", description: "this document", category: "wallet", expiryDate: "11/04/2025"} )
  
  
  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <FlatList
        data={documents}
        keyExtractor={item => item.id}
        renderItem={({item}) => <DocComponent id = {item.id} name={item.name} description={item.description} expiryDate={item.expiryDate} iconPath={categories[item.category]} />}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
