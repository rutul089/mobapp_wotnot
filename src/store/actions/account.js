import {API} from '../../apiService';
import {endPoints} from '../../../env';
import {
  loadingSet,
  loadingUnset,
  setTeamData,
  setTeammateData,
  saveReply,
  setUserPreference,
  setUserList,
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
  account_id,
  from,
  limit,
  isLoading,
  query,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    isLoading ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.fetchSavedReply(account_id, from, limit, query),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          // dispatch(saveReply(response));
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
export const fetchSavedReplySearch = (
  account_id,

  isLoading,
  query,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    isLoading ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.fetchSavedReplySearch(account_id, query),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          // dispatch(saveReply(response));
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

export const fetchUserList = (
  account_id,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    API.getInstance().Fetch(
      endPoints.fetchUserList(account_id),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setUserList(response));
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
