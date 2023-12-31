import authReducer from './authReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    tasks: taskReducer
});

export default rootReducer;