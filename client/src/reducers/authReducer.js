import { toast } from 'react-toastify';
import { sessionConstants } from '../actions/constants';

const inistate = {
  user: JSON.parse(localStorage.getItem('auth')) || {},
  error: localStorage.getItem('error') || null,
  authenticated: localStorage.getItem('auth') ? true : false,
};

const notify = (error) =>
  toast.error(error, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const authReducer = (state = inistate, action) => {
  switch (action.type) {
    case sessionConstants.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case sessionConstants.LOGIN_USER_FAIL:
      notify(action.payload.error.message);
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
    default:
      return state;
  }
};

export default authReducer;
