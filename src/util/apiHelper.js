import {navigateAndSimpleReset} from '../navigator/NavigationUtils';
import {showToast, showSWWToast, LONG_DURATION} from './helper';

export function checkForCode(status) {
  if (status === 401 || status == 402) {
    // AsyncStorage.clear();
    navigateAndSimpleReset('SignInScreen');
  }
}

export function handleFailureCallback(response, value = true, isNotCheckForCode=false) {
  if(!isNotCheckForCode){
    checkForCode(response.status != null && response.status);
  }
  if (response.data) {
    if (response.data) {
      if (value) {
        if (!response?.data?.ok) {
          showToast(response?.data?.message);
          return;
        }
        showSWWToast();
      }
    } else {
      if (value) {
        showSWWToast();
      }
    }
  } else {
    showSWWToast();
  }
}
