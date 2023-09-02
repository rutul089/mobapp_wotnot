import {types} from '../actions';

const initialState = {
  accounts: [],
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCOUNTS:
      return {...state, accounts: action.payload};
    case types.USER_LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};

export default global;
