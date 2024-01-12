import { userConstants } from './constants';

export const createUser = (user) => (dispatch) => {
  fetch('http://todolist-api.onrender.com/api/users/signup', {
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
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: userConstants.ADD_USER,
        payload: user,
      });
    })
    .catch((error) => {
      dispatch({
        type: userConstants.ADD_USER_FAIL,
        payload: {
          error,
        },
      });
    });
};

export const deleteUser = (token) => (dispatch) => {
  fetch('http://todolist-api.onrender.com/api/users/deleteuser', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
    })
    .then(() => {
      dispatch({
        type: userConstants.DELETE_USER,
      });
    })
    .catch((error) => {
      dispatch({
        type: userConstants.DELETE_USER_FAIL,
        payload: {
          error,
        },
      });
    });
};
