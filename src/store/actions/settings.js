import {API} from '../../apiService';
import {endPoints} from '../../../env';
import {
  loadingSet,
  loadingUnset,
  setAccountList,
  setCalendarEvent,
  setNotificationData,
  setUserSetting,
} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultHeaders2 = {
  accept: 'application/json',
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
    API.getInstance().Fetch(
      endPoints.uploadAttachment,
      defaultHeaders2,
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

export const fetchUserSetting = (
  accountId,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    // showLoader ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.userSettings(accountId),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          setUserSetting(response);
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

export const changeUserSetting = (param,{SuccessCallback, FailureCallback}) => {
  return dispatch => {
    // showLoader ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.changeUserSetting,
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


export const fetchCalendarEvent = (
  accountId,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    // showLoader ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.calendarEvent(accountId),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          setCalendarEvent(response);
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