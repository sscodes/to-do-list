import { combineReducers } from 'redux';
import themeReducer from './themeReducers';

const rootReducer = combineReducers({
  theme: themeReducer,
});

export default rootReducer;
