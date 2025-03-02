import { sessionConstants } from './constants';

export const googleOauth = (user) => (dispatch) => {
  localStorage.setItem('auth', JSON.stringify(user));
  dispatch({
    type: sessionConstants.LOGIN_USER,
    payload: user,
  });
};