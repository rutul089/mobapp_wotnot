import {combineReducers} from 'redux';
import global from './global';
import authReducer from './authReducer';
import detail from './detail';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
  global,
  authReducer,
  detail,
  accountReducer
});

export default rootReducer;
