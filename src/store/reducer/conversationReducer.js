import {types} from '../actions';

const initialState = {
  assignedChat: [],
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.ASSIGNED_CHAT:
      return {...state, assignedChat: action.payload};
    default:
      return state;
  }
};

export default global;
