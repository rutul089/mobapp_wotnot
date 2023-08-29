import types from './types';
import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {loadingSet, loadingUnset, userDetail, userProfile} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const userLogin = (param, {SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.login, defaultHeaders, param, {
      SuccessCallback: response => {
        dispatch(loadingUnset());
        dispatch(userDetail(response));
        SuccessCallback(response);
      },
      FailureCallback: response => {
        dispatch(loadingUnset());
        FailureCallback(response);
      },
    });
  };
};

export const forgotPassword = (param, {SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.resetPwdLink, defaultHeaders, param, {
      SuccessCallback: response => {
        dispatch(loadingUnset());
        SuccessCallback(response);
      },
      FailureCallback: response => {
        dispatch(loadingUnset());
        FailureCallback(response);
      },
    });
  };
};
