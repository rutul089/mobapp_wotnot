import {types} from '../actions';

const initialState = {
  teamData: [],
  teamMateData: [],
  savedReply: [],
  userQualifications: [],
  userList: {},
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEAMS:
      return {...state, teamData: action.payload};
    case types.FETCH_TEAMMATES:
      return {...state, teamMateData: action.payload};
    case types.FETCH_SAVE_REPLY:
      return {...state, savedReply: action.payload};
    case types.SET_QUALIFICATIONS:
      return {...state, userQualifications: action.payload};
    case types.USER_LIST:
      return {...state, userList: action.payload};
    case types.USER_LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};

export default global;
