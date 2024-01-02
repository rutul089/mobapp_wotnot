import {types} from '../actions';

const initialState = {
  accounts: [],
  notification_pref: {},
  userSetting: {},
  calendarEvent:[]
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCOUNTS:
      return {...state, accounts: action.payload};
    case types.NOTIFICATION_DATA:
      return {...state, notification_pref: action.payload};
    case types.USER_LOGOUT:
      return {...initialState};
    case types.USER_SETTINGS:
      return {...state, userSetting: action.payload};
    case types.CALENDER_EVENT:
      return {...state, calendarEvent: action.payload};
    default:
      return state;
  }
};

export default global;
