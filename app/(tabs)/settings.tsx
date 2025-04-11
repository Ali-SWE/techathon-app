// app/(tabs)/settings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [localStorageEnabled, setLocalStorageEnabled] = useState(true);
  const [useCloudUI] = useState(false); // placeholder toggle (disabled)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* التخزين */}
      <View style={styles.section}>
        <SettingItem icon="cloud" label="استخدام التخزين السحابي" isLast={false}>
          <Switch
            value={useCloudUI}
            disabled={true}
            {...(Platform.OS === 'android' && {
              thumbColor: '#ccc',
              trackColor: { true: 'gray', false: '#ccc' },
            })}
          />
        </SettingItem>
        <View style={styles.subTextWrapper}>
          <Text style={styles.subText}>
            هذا الخيار للعرض فقط. التخزين السحابي غير مفعل في هذا التطبيق.
          </Text>
        </View>

        <SettingItem icon="hdd" label="التخزين المحلي" isLast={true}>
          <Switch
            value={localStorageEnabled}
            onValueChange={setLocalStorageEnabled}
            {...(Platform.OS === 'android' && {
              thumbColor: localStorageEnabled ? 'black' : '#ccc',
              trackColor: { true: 'black', false: '#ccc' },
            })}
          />
        </SettingItem>
        <View style={styles.subTextWrapper}>
          <Text style={styles.subText}>
            سيتم حفظ البيانات والملفات على الجهاز مباشرة بدون استخدام خوادم خارجية.
          </Text>
        </View>
      </View>

      {/* التطبيق */}
      <View style={styles.section}>
        <SettingItem icon="star" label="قيّم التطبيق" isLast={false} />
        <SettingItem icon="share" label="مشاركة التطبيق" isLast={true} />
      </View>

      {/* قانوني */}
      <View style={styles.section}>
        <SettingItem icon="shield-alt" label="سياسة الخصوصية" isLast={false} />
        <SettingItem icon="file-contract" label="الشروط والأحكام" isLast={true} />
      </View>

      {/* الدعم */}
      <View style={styles.section}>
        <SettingItem icon="headset" label="تواصل معنا" isLast={true} />
      </View>
    </ScrollView>
  );
}

// ✅ Reusable item component
const SettingItem = ({
  icon,
  label,
  children,
  isLast,
}: {
  icon: string;
  label: string;
  children?: React.ReactNode;
  isLast: boolean;
}) => {
  return (
    <View style={[styles.item, !isLast && styles.itemWithBorder]}>
      <FontAwesome5 name={icon as any} size={18} color="black" style={styles.itemIcon} />
      <Text style={styles.itemLabel}>{label}</Text>
      {children && <View style={styles.itemToggle}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'right',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 1,
  },
  item: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 14,
  },
  itemWithBorder: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemIcon: {
    marginLeft: 12,
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  itemToggle: {
    marginLeft: 8,
  },
  subTextWrapper: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  subText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'right',
    lineHeight: 18,
  },
});