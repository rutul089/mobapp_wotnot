import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {loadingSet, loadingUnset, setAccountList} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
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
    dispatch(loadingSet());
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
