import types from './types';
import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {
  loadingSet,
  loadingUnset,
  userDetail,
  userProfile,
  clearAllData,
} from './global';
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

export const twoFactorCode = ({SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.twoFactorCode, defaultHeaders, '', {
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

export const verifyTFAOTP = (param, {SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.verifyOtp, defaultHeaders, param, {
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

export const verifyRecoveryCode = (
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.recoveryCode, defaultHeaders, param, {
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

export const userLogout = ({SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.userLogout, defaultHeaders, '', {
      SuccessCallback: response => {
        dispatch(loadingUnset());
        dispatch(clearAllData());
        SuccessCallback(response);
      },
      FailureCallback: response => {
        dispatch(loadingUnset());
        FailureCallback(response);
      },
    });
  };
};
