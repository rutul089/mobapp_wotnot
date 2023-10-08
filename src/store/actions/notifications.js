import types from './types';
import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {loadingSet, loadingUnset} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const setNotificationToken = (
  param,
  isLoading,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    isLoading ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.storeNotificationToken,
      defaultHeaders,
      param,
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          SuccessCallback(response);
        },
        FailureCallback: response => {
          dispatch(loadingUnset());
          FailureCallback(response);
        },
      },
    );
  };
};
