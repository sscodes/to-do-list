import { sessionConstants } from './constants';

export const loginUser = (user) => (dispatch) => {
  fetch('https://todolist-api.onrender.com/api/users/signin', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      } else return res.json();
    })
    .then((user) => {
      localStorage.setItem('auth', JSON.stringify(user));
      dispatch({
        type: sessionConstants.LOGIN_USER,
        payload: user,
      });
    })
    .catch((error) => {
      dispatch({
        type: sessionConstants.LOGIN_USER_FAIL,
        payload: {
          error,
        },
      });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: sessionConstants.LOGOUT_USER,
  });
};


export const googleOauth = (user) => (dispatch) => {
  localStorage.setItem('auth', JSON.stringify(user));
  dispatch({
    type: sessionConstants.LOGIN_USER,
    payload: user,
  });
};