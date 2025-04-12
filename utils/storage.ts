import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Doc } from './types';

// Save an object
export const saveObject = async (key: string, value: Doc) => {
  try {
    // Retrieve the existing list from AsyncStorage
    const existingValue = await AsyncStorage.getItem(key);

    // If the list exists, parse it; otherwise, start with an empty array
    let list: Doc[] = existingValue ? JSON.parse(existingValue) : [];
    // assign id
    value.id = list.length + 1 + ""
    // Add the new object to the list
    list.push(value);
    
    // list = []

    // Save the updated list back to AsyncStorage
    const jsonValue = JSON.stringify(list);
    await AsyncStorage.setItem(key, jsonValue);

  } catch (error) {
    console.error('Error saving object to AsyncStorage:', error);
  }
}

// Load the object
export const loadObject = async (key: string): Promise<Doc[]>  => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const deleteObject = async (key: string, id: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return;

    const data: Doc[] = JSON.parse(jsonValue);

    // Remove the item with the matching id
    const filtered = data.filter(item => item.id !== id);

    // Reassign ids to be "1", "2", "3", ...
    const updated = filtered.map((item, index) => ({
      ...item,
      id: (index + 1).toString(),
    }));
    

    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete object:", error);
  }
};

export const getBase64FromUri = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error reading image as base64:', error);
    return null;
  }
};

export const bytesToMB = (byteString: string): string => {
  // Parse the string to an integer
  const bytes = parseInt(byteString, 10);

  if (isNaN(bytes)) {
    return "0";
  }
  const mb = (bytes / (1024 * 1024)).toFixed(2)

  // Convert bytes to MB
  return  mb;
}


