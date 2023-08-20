import {types} from '../actions';

const initialState = {
  teamData: [],
  teamMateData: [],
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEAMS:
      return {...state, teamData: action.payload};
    case types.FETCH_TEAMMATES:
      return {...state, teamMateData: action.payload};
    default:
      return state;
  }
};

export default global;
