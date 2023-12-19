import { toast } from 'react-toastify';
import { sessionConstants, userConstants } from '../actions/constants';

const inistate = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  authenticated: localStorage.getItem('user') ? true : false,
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

const userReducer = (state = inistate, action) => {
  switch (action.type) {
    // case userConstants.READ_USER:
    //   return {
    //     ...state,
    //     users: action.payload,
    //   };
    case userConstants.ADD_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case userConstants.ADD_USER_FAIL:
      notify(action.payload.error.message);
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    case sessionConstants.LOGOUT_USER:
      localStorage.clear();
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
