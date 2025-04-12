import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBase64FromUri, loadObject } from '@/utils/storage';
import { saveObject } from '@/utils/storage';
import { Doc } from '@/utils/types';
import { useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const Form = ({ uri, mimeType, size }: {uri: string | string[], mimeType: string | string[], size: string | string[]}) => {
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    documentName: '',
    description: '',
    expiryDate: '',
    reminder: '',
    category: '',
    imageBase64: '',
    size: size + ""
  });

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

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
    { label: 'محفظة', value: 'wallet' },
    { label: 'بطاقات', value: 'cards' },
    { label: 'تسوق', value: 'shopping' },
    { label: 'وثائق', value: 'documents' },
  ];

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImageBase64 = async () => {
      setLoading(true);
      const base64 = await getBase64FromUri(uri+"");
      setFormData({ ...formData, imageBase64: base64+"" });
      setLoading(false);
    };

    if (uri) {
      fetchImageBase64();
    }
  }, []);

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);
    saveObject("documents", formData);
    const result: Doc[] = await loadObject("documents");
    // router.replace('/index');
  };
  
  const handleDateConfirm = (date: Date) => {
    setFormData({ ...formData, expiryDate: moment(date).format('DD/MM/YYYY') });
    setDatePickerVisibility(false);
  };

  const handleReminderSelect = (option: {label: string, value: string}) => {
    setFormData({ ...formData, reminder: option.value });
    setShowReminderModal(false);
  };

  const handleCategorySelect = (category: { label: string, value: string }) => {
    setFormData({ ...formData, category: category.value });
    setShowCategoryModal(false);
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {formData.imageBase64 && !loading && (
        <Image source={{ uri: `data:image/jpeg;base64,${formData.imageBase64}` }} style={{ width: 100, height: 100 }} />
      )}

      <View style={styles.formGroup}>
        <TextInput
          style={[styles.input, styles.rtlInput]}
          placeholder="اسم المستند"
          value={formData.documentName}
          onChangeText={(text) => setFormData({ ...formData, documentName: text })}
          textAlign="right"
        />
      </View>

      <View style={styles.formGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>وصف المستند</Text>
          <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
        </View>
        <TextInput
          style={[styles.input, styles.textArea, styles.rtlInput]}
          placeholder="الوصف"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          textAlign="right"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>تاريخ الانتهاء</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowReminderModal(true)} // Show the reminder modal
          >
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
            <Text style={styles.dropdownButtonText}>{formData.reminder || 'تذكير قبل'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setDatePickerVisibility(true)} // Show the date picker modal
          >
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
            <Text style={styles.dropdownButtonText}>{formData.expiryDate || 'اختر التاريخ'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker Modal */}
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

    {/* reminder modal */}
      <Modal visible={showReminderModal} transparent={true} animationType="slide" onRequestClose={() => setShowReminderModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowReminderModal(false)}>
          <View style={styles.modalContent}>
            {reminderOptions.map((option) => (
              <TouchableOpacity key={option.value} style={styles.modalOption} onPress={() => handleReminderSelect(option)}>
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* category modal */}
      <Modal visible={showCategoryModal} transparent={true} animationType="slide" onRequestClose={() => setShowCategoryModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowCategoryModal(false)}>
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
    gap: 20
  },
  formGroup: {
    gap: 8
  },
  formGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-end'
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white'
  },
  rtlInput: {
    textAlign: 'right'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  reminderContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
    minWidth: 140,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white'
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginTop: 8
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%'
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  modalOptionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'right'
  }
});

export default Form;