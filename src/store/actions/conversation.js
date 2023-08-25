import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {
  loadingSet,
  loadingUnset,
  setConversationsCount,
  setConversations,
} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const fetchConversation = (
  account_id,
  status_id,
  limit,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchConversation(account_id, status_id, limit),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setConversations(response));
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

export const fetchConversationSummary = (
  account_id,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.conversationSummary(account_id),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setConversationsCount(response));
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
