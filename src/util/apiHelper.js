import {LOCAL_STORAGE, removeItemFromStorage} from '../constants/storage';
import {showSWWToast, showToast} from './helper';

export function checkForCode(status) {
  if (status === 401 || status == 402) {
    Object.keys(LOCAL_STORAGE).map(key =>
      removeItemFromStorage(LOCAL_STORAGE[key]),
    );

    navigateAndSimpleReset('SignInScreen');
  }
}

export function handleFailureCallback(
  response,
  value = true,
  isNotCheckForCode = false,
) {
  if (!isNotCheckForCode) {
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
