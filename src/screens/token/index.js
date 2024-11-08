import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

const PushNotificationComponent = () => {
  const [pushToken, setPushToken] = useState(null);

  useEffect(() => {
    // Request permission for notifications directly with expo-notifications
    const getNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync(); // Request permission here
      if (status === 'granted') {
        // Get the token for push notifications
        const token = await Notifications.getExpoPushTokenAsync();
        setPushToken(token.data);
        console.log('Expo Push Token:', token.data);
      } else {
        console.log('Permission not granted for push notifications');
      }
    };

    getNotificationPermission();

    // Optionally: Handle received notifications
    Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Optionally: Handle notification response
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });
  }, []);

  return (
    <View>
      {pushToken ? (
        <Text>Your Push Token: {pushToken}</Text>
      ) : (
        <Text>Getting Push Token...</Text>
      )}
    </View>
  );
};

export default PushNotificationComponent;
