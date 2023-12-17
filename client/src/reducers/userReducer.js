import { userConstants } from '../actions/constants';

const inistate = {
  user: {},
  error: null,
};

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
      };
    case userConstants.ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
