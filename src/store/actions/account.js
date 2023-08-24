import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {loadingSet, loadingUnset, setTeamData, setTeammateData,saveReply} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const fetchTeamData = (
  userID,
  offset,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchTeam(userID, offset),
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
  userID,
  param,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchTeammates(userID),
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
