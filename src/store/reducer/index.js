import {combineReducers} from 'redux';
import global from './global';
import authReducer from './authReducer';
import detail from './detail';
import accountReducer from './accountReducer';
import qualifications from './qualifications';
import conversationReducer from './conversationReducer';
import settings from './settings';

const rootReducer = combineReducers({
  global,
  authReducer,
  detail,
  accountReducer,
  qualifications,
  conversationReducer,
  settings
});

export default rootReducer;
