import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducers';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
});

export default rootReducer;
