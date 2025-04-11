import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Form = () => {
  const [formData, setFormData] = useState({
    documentName: '',
    description: '',
    expiryDate: '',
    reminder: 'تذكير قبل',
    category: 'اختر الفئة'
  });

  const [showReminderModal, setShowReminderModal] = useState(false);

  const reminderOptions = [
    { label: 'بدون تذكير', value: 'none' },
    { label: 'قبل يوم واحد', value: '1_day' },
    { label: 'قبل يومين', value: '2_days' },
    { label: 'قبل 3 أيام', value: '3_days' },
    { label: 'قبل 4 أيام', value: '4_days' },
    { label: 'قبل 5 أيام', value: '5_days' },
    { label: 'قبل 6 أيام', value: '6_days' },
    { label: 'قبل أسبوع', value: '7_days' },
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.dateContainer}>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowReminderModal(true)}
          >
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
            <Text style={styles.dropdownButtonText}>{formData.reminder}</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.dateInput, styles.rtlInput]}
            placeholder="DD/MM/YY"
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            textAlign="right"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
          <Text style={styles.categoryButtonText}>{formData.category}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        <Text style={styles.submitButtonText}>إرسال</Text>
      </TouchableOpacity>

      <Modal
        visible={showReminderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReminderModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowReminderModal(false)}
        >
          <View style={styles.modalContent}>
            {reminderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  setFormData({ ...formData, reminder: option.label });
                  setShowReminderModal(false);
                }}
              >
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
    justifyContent: 'flex-end'
  },
  dateInput: {
    flex: 1
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
    minWidth: 140
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8
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
