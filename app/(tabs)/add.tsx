// app/(tabs)/add.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Add() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>إضافة مستند</Text>

      <TouchableOpacity style={styles.card}>
        <FontAwesome5 name="file-upload" size={24} color="#000" />
        <Text style={styles.cardText}>رفع ملف</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <FontAwesome5 name="image" size={24} color="#000" />
        <Text style={styles.cardText}>من المكتبة</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <FontAwesome5 name="camera" size={24} color="#000" />
        <Text style={styles.cardText}>المسح الضوئي</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 60 : 80,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
});