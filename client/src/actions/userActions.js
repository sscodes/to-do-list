import { userConstants } from './constants';

export const createUser = (user) => (dispatch) => {
  fetch('http://localhost:7000/api/users/signup', {
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

export const readUser = () => (dispatch) => {
  //TODO: Replace fake API with real API
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((tasks) =>
      dispatch({
        type: userConstants.READ_TASKS,
        payload: tasks,
      })
    );
  //TODO: Add error handling
  // .catch(dispatch({
  //     type: userConstants.ADD_TASK_FAIL,
  //     payload: {
  //         error: res.data.error
  //     }
  // }));
};
