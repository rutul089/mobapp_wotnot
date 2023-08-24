import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {loadingSet, loadingUnset, setAssignedChat} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const getAssignedChat = (
  userID,
  status_id,
  limit,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchConversation(userID, status_id, limit),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setAssignedChat(response));
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
