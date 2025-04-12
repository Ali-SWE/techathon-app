import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Form from '@/components/Form';
import { useLocalSearchParams } from 'expo-router';
import { getBase64FromUri } from '@/utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function FormScreen() {
  const { uri, mimeType, size } = useLocalSearchParams();
  console.log(size)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Form uri={uri} mimeType={mimeType} size={size}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});