import Toast from 'react-native-root-toast';
import {Linking} from 'react-native';

export const LONG_DURATION = Toast.durations.LONG;
export const MED_DURATION = 3000;
export const SHORT_DURATION = Toast.durations.SHORT;
export {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from './ResponsiveSize';

export const VALIDATION_REGEX = {
  email: /^\w+([\.-]?\w+)*([+]\w+)?@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  strongPassword:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-\/\\^$*+?.()|[\]{}"!@#%&,><':;_~=`])(?=.{8,})/,
  mediumPassword:
    /^((?=.*[a-z])|(?=.*[-\/\\^$*+?.()|[\]{}"!@#%&,><':;_~=`])|(?=.*[0-9]))(?=.{8,})/,
  specialCharacter: /[-\/\\^$*+?.()|[\]{}"!@#%&,><':;_~=`]/,
  hasEmoji:
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
};

export const showSWWToast = (duration = LONG_DURATION) => {
  Toast.show('Something went wrong please try again', {
    duration: duration,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

export function helperLog(tag, type) {
  if (__DEV__) {
    console.log(tag, JSON.stringify(type));
  }
}

export const showToast = (message,duration = LONG_DURATION) => {
  Toast.show(message, {
    duration: duration,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};
