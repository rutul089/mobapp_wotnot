import {combineReducers} from 'redux';
import global from './global';
import authReducer from './authReducer';
import detail from './detail';

const rootReducer = combineReducers({
  global,
  authReducer,
  detail
});

export default rootReducer;
