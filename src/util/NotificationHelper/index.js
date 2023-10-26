import {Platform, PermissionsAndroid, Linking} from 'react-native';
import {
  checkNotifications,
  PERMISSIONS,
  check,
  requestNotifications,
  request,
  requestMultiple,
} from 'react-native-permissions';

export const checkNotificationPermission = async () => {
  checkNotifications().then(({status, settings}) => {
    if (status === 'blocked' || status === 'denied') {
      return false;
    } else {
      return true;
    }
    console.log('status', status);
    console.log('settings', settings);
  });
};

export const reqNotificationPermission = async () => {
  check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.CONTACTS
      : PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  ).then(result => {
    switch (result) {
      case 'denied':
        request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
          console.log('result1', result);
        });
        return;
      default:
        return;
    }
  });
};

export const requestNotificationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

// export const checkNotificationPermission = async () => {
//   const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//   return result;
// };

export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return true;
    }
  } catch (err) {
    console.log('err', err);
  }
};
