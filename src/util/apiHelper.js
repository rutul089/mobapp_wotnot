import {LOCAL_STORAGE, removeItemFromStorage} from '../constants/storage';
import {showSWWToast, showToast} from './helper';
import {navigateAndSimpleReset} from '../navigator/NavigationUtils';
import { disconnect } from '../websocket';

export function checkForCode(status) {
  if (status === 401 || status == 402) {
    Object.keys(LOCAL_STORAGE).map(key =>
      removeItemFromStorage(LOCAL_STORAGE[key]),
    );
    disconnect()
    navigateAndSimpleReset('SignInScreen');
  }
}

export function handleFailureCallback(
  response,
  value = true,
  isNotCheckForCode = false,
  showToast = true,
) {
  if (!isNotCheckForCode) {
    checkForCode(response.status != null && response.status);
  }
  if (!showToast) return;
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
