import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {
  loadingSet,
  loadingUnset,
  setAccountList,
  setNotificationData,
} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultHeaders2 = {
  'accept': 'application/json', 
  'Content-Type': 'multipart/form-data', 
};

export const fetchAccounts = ({SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.accounts, defaultHeaders, '', {
      SuccessCallback: response => {
        dispatch(loadingUnset());
        dispatch(setAccountList(response));
        SuccessCallback(response);
      },
      FailureCallback: response => {
        dispatch(loadingUnset());
        FailureCallback(response);
      },
    });
  };
};

export const setIncomingEvent = (
  agent_id,
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    // dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.setIncomingEvents(agent_id),
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

export const setProfileEvents = (
  agent_id,
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.profileEvents(agent_id),
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

export const notificationPreference = ({SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.notificationPreference,
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setNotificationData(response));
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

export const setNotificationPreference = (
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.changeNotificationPreference,
      defaultHeaders,
      param,
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setNotificationData(response));
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

export const uploadFileAttachment = (
  param,
  showLoader,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    showLoader ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(endPoints.uploadAttachment, defaultHeaders2, param, {
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
