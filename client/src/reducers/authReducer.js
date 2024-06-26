import { toast } from 'react-toastify';
import { sessionConstants, userConstants } from '../actions/constants';

const inistate = {
  user: JSON.parse(localStorage.getItem('auth')) || {},
  error: localStorage.getItem('error') || null,
  authenticated: localStorage.getItem('auth') ? true : false,
};

const notificationProperties = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const notifyError = (error) => toast.error(error, notificationProperties);
const notify = (message) =>
  toast(message, {
    position: 'top-center',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const authReducer = (state = inistate, action) => {
  switch (action.type) {
    case sessionConstants.LOGIN_USER_LOADING:
      notify('Please wait while we log you in.');
      return {
        ...state,
      };
    case sessionConstants.LOGIN_USER:
      setTimeout(() => toast.dismiss(), 740);
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case sessionConstants.LOGIN_USER_FAIL:
      setTimeout(() => toast.dismiss(), 740);
      notifyError(action.payload.error.message);
      return {
        ...state,
        error: action.payload.error,
      };
    case sessionConstants.LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        user: {},
        error: null,
        authenticated: false,
      };
    case userConstants.DELETE_USER:
      localStorage.removeItem('tasks');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
