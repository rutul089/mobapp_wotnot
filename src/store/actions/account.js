import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {
  loadingSet,
  loadingUnset,
  setTeamData,
  setTeammateData,
  saveReply,
  setUserPreference,
} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const fetchTeamData = (
  account_id,
  offset,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchTeam(account_id, offset),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setTeamData(response));
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

export const fetchTeammateData = (
  account_id,
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchTeammates(account_id),
      defaultHeaders,
      param,
      {
        SuccessCallback: response => {
          // console.log("callFetchTeammateData_SuccessCallback",JSON.stringify(response))
          dispatch(loadingUnset());
          dispatch(setTeammateData(response));
          SuccessCallback(response);
        },
        FailureCallback: response => {
          // console.log("callFetchTeammateData_FailureCallback",JSON.stringify(response))
          dispatch(loadingUnset());
          FailureCallback(response);
        },
      },
    );
  };
};

export const fetchSavedReply = (
  userID,
  from,
  limit,
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchSavedReply(userID, from, limit),
      defaultHeaders,
      param,
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(saveReply(response));
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

export const changeAccount = (param, {SuccessCallback, FailureCallback}) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(endPoints.changeAccount, defaultHeaders, param, {
      SuccessCallback: response => {
        dispatch(loadingUnset());
        dispatch(setUserPreference(response));
        SuccessCallback(response);
      },
      FailureCallback: response => {
        dispatch(loadingUnset());
        FailureCallback(response);
      },
    });
  };
};
