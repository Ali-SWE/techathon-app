import { useActionSheet } from '@expo/react-native-action-sheet';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteObject } from '@/utils/storage';
import ImagePreviewModal from './ImageModal';

type Status = 'expired' | 'soon' | 'valid';

type Props = {
  id: string;
  name: string;
  description?: string;
  expiryDate?: string;
  iconPath: any;
  status?: Status;
  size?: string;
  imageBase64?: string;
  mimeType?: string;
};

export function DocComponent({ id, name, description, expiryDate, iconPath, status, size, imageBase64, mimeType }: Props) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [showImageModal, setShowImageModal] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteObject("documents", id);
  };

  const handleMenuPress = () => {
    const options = ['فتح المستند', 'حذف', 'إلغاء'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: name,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            setShowImageModal(true);
            break;
          case 1:
            handleDelete(id);
            break;
        }
      }
    );
  };

  const getStatusStyle = (status?: Status) => {
    switch (status) {
      case 'expired':
        return { label: 'منتهي', icon: 'calendar-remove', color: '#e63946', bg: '#fdecea' };
      case 'soon':
        return { label: 'قريبًا', icon: 'calendar-clock', color: '#f4a261', bg: '#fff4e5' };
      case 'valid':
        return { label: 'ساري', icon: 'calendar-check', color: '#2a9d8f', bg: '#e6f4f1' };
      default:
        return null;
    }
  };

  const statusData = getStatusStyle(status);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <MaterialCommunityIcons name="dots-vertical" size={20} color="#B0B0B0" />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Image
            source={typeof iconPath === 'string' ? { uri: iconPath } : iconPath}
            style={{ width: 50, height: 50, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        {size && <Text style={styles.sizeText}>{size}</Text>}

        <View style={styles.dateStatusRow}>
          {expiryDate && (
            <View style={styles.dateRow}>
              <MaterialCommunityIcons name="calendar" size={14} color="#999" />
              <Text style={styles.expiry}>{formatArabicDate(expiryDate)}</Text>
            </View>
          )}

          {statusData && (
            <View style={[styles.statusBadge, { backgroundColor: statusData.bg }]}>
              <MaterialCommunityIcons name={statusData.icon} size={14} color={statusData.color} />
              <Text style={[styles.statusText, { color: statusData.color }]}>
                {'  '}
                {statusData.label}
              </Text>
            </View>
          )}
        </View>
      </View>

      <ImagePreviewModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        base64={imageBase64 + ""}
        mimeType={mimeType + ""}
      />
    </View>
  );
}

function formatArabicDate(dateString: string): string {
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const [day, month, year] = dateString.split('/');
  const monthName = months[parseInt(month) - 1];
  return `ينتهي في ${day} ${monthName} ${year}`;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  iconContainer: {
    marginRight: 8,
    marginLeft: 12,
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
    gap: 2,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  sizeText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
    marginBottom: 4,
  },
  dateStatusRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 14,
  },
  dateRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  expiry: {
    color: '#888',
    fontSize: 13,
    marginRight: 6,
    textAlign: 'right',
  },
  statusBadge: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  menuButton: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 4,
    zIndex: 10,
  },
});