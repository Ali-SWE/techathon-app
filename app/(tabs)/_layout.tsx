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

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 18,
            marginHorizontal: 18,
            height: 60, // More height to fit Arabic labels properly
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
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="bell" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>التنبيهات</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="empty"
          options={{
            tabBarIcon: () => (
              <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.actionButton}>
                  <Image
                    source={require('@/assets/plus.png')}
                    style={{ width: 22, height: 22, tintColor: 'white' }}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="mydocuments"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="file-alt" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>المستندات</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="home" size={20} color={focused ? 'black' : 'gray'} />
                <Text style={[styles.label, focused && styles.focusedLabel]}>الرئيسية</Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'red',
    height:30,
    width:60
  },
  label: {
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 2,
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