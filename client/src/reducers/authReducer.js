import { sessionConstants } from '../actions/constants';

const inistate = {
  user: {},
  error: null,
  authenticated: false,
};

const authReducer = (state = inistate, action) => {
  switch (action.type) {
    case sessionConstants.LOGOUT_USER:
      return {
        ...inistate,
      };
    default:
      return state;
  }
};

export default authReducer;
