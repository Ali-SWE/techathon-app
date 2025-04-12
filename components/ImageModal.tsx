import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shareFile, saveBase64ToFile } from '@/utils/storage';

interface ImagePreviewModalProps {
  visible: boolean;
  onClose: () => void;
  base64: string;
  mimeType: string;
  
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ visible, onClose, base64, mimeType }) => {

  const handleShare = async () => {
    try {
      const fileUri = await saveBase64ToFile(base64, mimeType);
      await shareFile(fileUri)
    } catch (error) {
      console.error('Share error:', error);
    }
  };
  
  
  
  
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: `data:image/jpeg;base64,${base64}`}} style={styles.image} resizeMode="contain" />
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-social-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '80%',
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 20,
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
});

export default ImagePreviewModal;
