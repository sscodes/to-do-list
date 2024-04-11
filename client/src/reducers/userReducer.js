import { toast } from 'react-toastify';
import { sessionConstants, userConstants } from '../actions/constants';

const inistate = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  authenticated: localStorage.getItem('user') ? true : false,
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
  const notify = (message) => toast(message, notificationProperties);

const userReducer = (state = inistate, action) => {
  switch (action.type) {
    case userConstants.ADD_USER_LOADING:
      notify('Please wait while we get you ready.');
      return {
        ...state,
      };
    case userConstants.ADD_USER:
      setTimeout(() => toast.dismiss(), 740);
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case userConstants.ADD_USER_FAIL:
      setTimeout(() => toast.dismiss(), 740);
      notifyError(action.payload.error.message);
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    case userConstants.DELETE_USER:
      localStorage.clear();
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    case userConstants.DELETE_USER_FAIL:
      notifyError(action.payload.error.message);
      return {
        ...state,
      };
    case sessionConstants.LOGOUT_USER:
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

export default userReducer;
