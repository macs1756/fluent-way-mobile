import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

const PushNotificationComponent = () => {
  const [pushToken, setPushToken] = useState(null);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getDeviceToken() {
    const token = await messaging().getToken();
    console.log('Device Token:', token);
    setPushToken(token)
    return token;
  }

  useEffect(() => {
    requestUserPermission()
    getDeviceToken()
  }, [])


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
