import {types} from '../actions';

const initialState = {
  conversations: [],
  conversation_summary:{}
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONVERSATIONS:
      return {...state, conversations: action.payload};
    case types.SET_CONVERSATIONS_COUNT:
      return {...state, conversation_summary: action.payload};
    default:
      return state;
  }
};

export default global;
