import {types} from '../actions';

const initialState = {
  loading: false,
  userDetail: {},
  errorMessage: '',
  isError: false,
  userProfile: {},
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.API_LOADING_START:
      return {...state, loading: true};
    case types.API_LOADING_STOP:
      return {...state, loading: false};
    case types.USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case types.USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

export default global;
