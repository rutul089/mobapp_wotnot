import {types} from '../actions';

const initialState = {
  accounts: [],
  notification_pref:{}
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCOUNTS:
      return {...state, accounts: action.payload};
    case types.NOTIFICATION_DATA:
      return {...state, notification_pref: action.payload};
    case types.USER_LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};

export default global;
