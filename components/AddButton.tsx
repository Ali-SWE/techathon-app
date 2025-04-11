import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function AddButton({}) {
  const [showOptions, setShowOptions] = useState(false);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      Alert.alert('تم رفع الملف', result.assets[0].name);
    }
    setShowOptions(false);
  };

  const handlePickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      Alert.alert('تم اختيار صورة من المعرض');
    }
    setShowOptions(false);
  };

  const handleScanWithCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('يجب منح صلاحية الكاميرا');
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      Alert.alert('تم التقاط صورة');
    }
    setShowOptions(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() => setShowOptions(true)}
      >
        <Image
          source={require('@/assets/plus.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={showOptions}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setShowOptions(false)}
        >
          <View style={styles.menu}>
            <Option text="📄 رفع ملف" onPress={handlePickFile} />
            <Option text="🖼 من المعرض" onPress={handlePickFromGallery} />
            <Option text="📷 المسح الضوئي" onPress={handleScanWithCamera} />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const Option = ({ text, onPress }: { text: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    top: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: 'white',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'android' ? 90 : 110,
    alignItems: 'center',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 200,
    paddingVertical: 12,
    elevation: 4,
    alignItems: 'center',
  },
  option: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});