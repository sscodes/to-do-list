import { taskConstants } from './constants';

export const createTask = (task) => (dispatch) => {
  //TODO: Replace fake API with real API
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((task) =>
      dispatch({
        type: taskConstants.ADD_TASK,
        payload: task,
      })
    );
  //TODO: Add error handling
  // .catch(dispatch({
  //     type: taskConstants.ADD_TASK_FAIL,
  //     payload: {
  //         error: res.data.error
  //     }
  // }));
};

export const readTask = () => (dispatch) => {
  //TODO: Replace fake API with real API
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((tasks) =>
      dispatch({
        type: taskConstants.READ_TASKS,
        payload: tasks,
      })
    );
  //TODO: Add error handling
  // .catch(dispatch({
  //     type: taskConstants.ADD_TASK_FAIL,
  //     payload: {
  //         error: res.data.error
  //     }
  // }));
};
