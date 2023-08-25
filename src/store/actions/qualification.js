import {API} from '../../apiService';
import {endPoints} from '../../constants/urls';
import {
  loadingSet,
  loadingUnset,
  setQualifications
} from './global';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const fetchQualifications = (
    conversation_key,
  {SuccessCallback, FailureCallback},
) => {
  return dispatch => {
    dispatch(loadingSet());
    API.getInstance().Fetch(
      endPoints.fetchQualifications(conversation_key),
      defaultHeaders,
      '',
      {
        SuccessCallback: response => {
          dispatch(loadingUnset());
          dispatch(setQualifications(response));
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
