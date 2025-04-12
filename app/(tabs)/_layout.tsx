import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AddButton from '@/components/AddButton';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function TabLayout() {
  return (
    <ActionSheetProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 18,
            marginHorizontal: 18,
            height: 60,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
          },
        }}
      >
        <Tabs.Screen
          name="settings"
          options={{
            title: 'الإعدادات',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="cog" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>الإعدادات</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="reminders"
          options={{
            title: 'التنبيهات',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="bell" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>التنبيهات</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'إضافة',
            tabBarButton: (props) => <AddButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="mydocuments"
          options={{
            title: 'المستندات',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="file-alt" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>المستندات</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: 'الرئيسية',
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="home" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>الرئيسية</Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 20,
    width: 40,
  },
  label: {
    fontSize: 8,
    color: 'gray',
    textAlign: 'center',
    lineHeight: 12,
    marginTop: 1,
  },
  focusedLabel: {
    color: 'black',
    fontWeight: '600',
  },
  actionButton: {
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 50 : 30,
  },
});