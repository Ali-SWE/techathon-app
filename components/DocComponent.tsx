import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


type Props = {
  id: string
  name: string
  description: string
  expiryDate: string
  iconPath: any
}

export function DocComponent({id, name,description, expiryDate, iconPath }: Props){
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground]}>
          <Image
            source={iconPath}
            style={{ width: 50, height: 50 }}
            />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{expiryDate}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  card: {
    flexDirection: 'row-reverse',
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
    marginRight: 8,
    marginLeft: 16
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
    gap: 5
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right'
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
    textAlign: 'right'
  },
  menuButton: {
    padding: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    gap: 3
  },
  menuDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#9CA3AF'
  },
});