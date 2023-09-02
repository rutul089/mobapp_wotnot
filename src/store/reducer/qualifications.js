import {types} from '../actions';

const initialState = {
  qualifications: null,
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUALIFICATIONS:
      return {...state, qualifications: action.payload};
    case types.USER_LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};

export default global;
