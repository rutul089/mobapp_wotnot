import {types} from '../actions';

const initialState = {
  labelData: [],
  userPreference:{}
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LABEL:
      return {...state, labelData: action.payload};
      case types.USER_PREFERENCE:
        return {...state, userPreference: action.payload};
    default:
      return state;
  }
};

export default global;
