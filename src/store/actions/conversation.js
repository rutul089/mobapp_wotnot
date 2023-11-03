import {API} from '../../apiService';
import {endPoints} from '../../../env';
import {
  loadingSet,
  loadingUnset,
  setConversations,
  setConversationsCount,
  setFilterConversation,
  loadingSetConversations,
  loadingUnsetConversations,
  setConversationsHistory,
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
export const fetchConversationBySearch = (
  account_id,
  query,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchConversationBySearch(account_id, query),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setFilterConversation(response));
          SuccessCallback(response);
        },
        FailureCallback: response => {
          dispatch(loadingUnset());
          dispatch(setFilterConversation(response));
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

export const fetchConversationHistory = (
  thready_key,
  query,
  isLoading,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    isLoading ? dispatch(loadingSet()) : null;
    API.getInstance().Fetch(
      endPoints.fetchConversationHistory(thready_key, query),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setConversationsHistory(response));
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
