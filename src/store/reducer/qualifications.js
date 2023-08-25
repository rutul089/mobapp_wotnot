import {types} from '../actions';

const initialState = {
  qualifications: null,
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUALIFICATIONS:
      return {...state, qualifications: action.payload};
    default:
      return state;
  }
};

export default global;
