import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBase64FromUri, loadObject, saveObject } from '@/utils/storage';
import { Doc } from '@/utils/types';
import { useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { scheduleDocReminder } from '@/utils/notification';

const Form = ({ uri, mimeType, size }: { uri: string | string[], mimeType: string | string[], size: string | string[] }) => {
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    documentName: '',
    description: '',
    expiryDate: '',
    reminder: '',
    category: '',
    imageBase64: '',
    size: size + "",
    mimeType: mimeType ? mimeType + "" : ''
  });

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const reminderOptions = [
    { label: 'بدون تذكير', value: '0' },
    { label: 'قبل يوم واحد', value: '1' },
    { label: 'قبل يومين', value: '2' },
    { label: 'قبل 3 أيام', value: '3' },
    { label: 'قبل 4 أيام', value: '4' },
    { label: 'قبل 5 أيام', value: '5' },
    { label: 'قبل 6 أيام', value: '6' },
    { label: 'قبل أسبوع', value: '7' },
  ];

  const categoryOptions = [
    { label: 'الكترونيات', value: 'الكترونيات' },
    { label: 'بطاقات', value: 'بطاقات' },
    { label: 'تسوق', value: 'تسوق' },
    { label: 'محفظة', value: 'محفظة' },
  ];

  useEffect(() => {
    const fetchImageBase64 = async () => {
      setLoading(true);
      const base64 = await getBase64FromUri(uri + "");
      setFormData(prev => ({ ...prev, imageBase64: base64 + "" }));
      setLoading(false);
    };

    if (uri) {
      fetchImageBase64();
    }
  }, []);

  const handleSubmit = async () => {
    const prevDocs: Doc[] = await loadObject("documents") || [];

    const newDoc: Doc = {
      ...formData,
      id: Date.now().toString(),
    };

    const updatedDocs = [...prevDocs, newDoc];
    await saveObject("documents", updatedDocs);
    await scheduleDocReminder(newDoc);
    router.replace('/(tabs)/home');
  };

  const handleDateConfirm = (date: Date) => {
    setFormData({ ...formData, expiryDate: moment(date).format('DD/MM/YYYY') });
    setDatePickerVisibility(false);
  };

  const handleReminderSelect = (option: { label: string, value: string }) => {
    setFormData({ ...formData, reminder: option.value });
    setShowReminderModal(false);
  };

  const handleCategorySelect = (category: { label: string, value: string }) => {
    setFormData({ ...formData, category: category.value });
    setShowCategoryModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} style={styles.closeButton}>
        <Ionicons name="close" size={28} color="#374151" />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && formData.imageBase64 && (
        <View style={styles.imageFrame}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${formData.imageBase64}` }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>اسم المستند</Text>
        <TextInput
          style={[styles.input, styles.rtlInput]}
          placeholder="اسم المستند"
          value={formData.documentName}
          onChangeText={(text) => setFormData({ ...formData, documentName: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>وصف المستند</Text>
        <TextInput
          style={[styles.input, styles.textArea, styles.rtlInput]}
          placeholder="الوصف"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>تاريخ الانتهاء</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowReminderModal(true)}>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
            <Text style={styles.dropdownButtonText}>{formData.reminder || 'تذكير قبل'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownButton} onPress={() => setDatePickerVisibility(true)}>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
            <Text style={styles.dropdownButtonText}>{formData.expiryDate || 'اختر التاريخ'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <View style={styles.formGroup}>
        <Text style={styles.label}>الفئة</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowCategoryModal(true)}>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
          <Text style={styles.dropdownButtonText}>{formData.category || 'اختر الفئة'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        <Text style={styles.submitButtonText}>إرسال</Text>
      </TouchableOpacity>

      {/* Reminder Modal */}
      <Modal visible={showReminderModal} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowReminderModal(false)}>
          <View style={styles.modalContent}>
            {reminderOptions.map((option) => (
              <TouchableOpacity key={option.value} style={styles.modalOption} onPress={() => handleReminderSelect(option)}>
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Category Modal */}
      <Modal visible={showCategoryModal} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowCategoryModal(false)}>
          <View style={styles.modalContent}>
            {categoryOptions.map((option) => (
              <TouchableOpacity key={option.value} style={styles.modalOption} onPress={() => handleCategorySelect(option)}>
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  formGroup: {
    gap: 8
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  rtlInput: {
    textAlign: 'right'
  },
  textArea: {
    height: 100,
  },
  imageFrame: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 6,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  dateRow: {
    flexDirection: 'row-reverse',
    gap: 12,
    justifyContent: 'space-between',
  },
  dropdownButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    minWidth: 140,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginHorizontal: 8,
  },
  submitButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginTop: 12
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#374151'
  }
});

export default Form;