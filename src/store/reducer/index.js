import {combineReducers} from 'redux';
import global from './global';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  global,
  authReducer
});

export default rootReducer;
