import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-notifications';
import { Platform } from 'react-native';
import { Doc } from './types';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

// Ensure permissions
const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications not granted!');
  }
};

// Schedule a notification
export const scheduleDocReminder = async (doc: Doc) => {
  await requestNotificationPermission();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const split = doc.expiryDate.split("/")
  const day = parseInt(split[0])
  const month = parseInt(split[1])
  const year = parseInt(split[2])
  const now = new Date()
  console.log()
  console.log()
  const expiry = new Date(year, month - 1, day, now.getHours(), now.getMinutes() + 1, 0); // 11pm local time
  
  const reminderTime = new Date(expiry);
  reminderTime.setDate(reminderTime.getDate() - parseInt(doc.reminder)); // 3 days before expiry
  console.log("expiry" + expiry)
  console.log("reminderTime" + reminderTime)
  console.log( "new Date()" + new Date())
  if (reminderTime < now) {
    console.log("Reminder time is in the past. Skipping.");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📄 Document Expiry Reminder",
      body: `${doc.documentName} will expire in ${doc.reminder} days.`,
      data: { docId: doc.id },
    },
    trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: reminderTime
    },
  });

  console.log(`Reminder scheduled for ${reminderTime}`);
};
