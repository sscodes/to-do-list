import { sessionConstants } from './constants';

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: sessionConstants.LOGOUT_USER,
  });
};
