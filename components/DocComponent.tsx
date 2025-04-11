import { Doc } from '@/types';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export function DocComponent({id, name,description, expiryDate }: Doc){
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground]}>
          {/* <Icon name={item.icon} size={24} color="#fff" /> */}
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{expiryDate}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        {/* <Icon name="dots-vertical" size={22} color="#333" /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
  },
  menuButton: {
    padding: 4,
  },
});