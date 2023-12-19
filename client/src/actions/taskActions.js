import { taskConstants } from './constants';

export const createTask = (task, token) => (dispatch) => {
  fetch('http://localhost:7000/api/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      } else return res.json();
    })
    .then((task) => {
      dispatch({
        type: taskConstants.ADD_TASK,
        payload: task,
      });
    })
    .catch((error) => {
      dispatch({
        type: taskConstants.ADD_TASK_FAIL,
        payload: {
          error,
        },
      });
    });
};

export const readTask = (token) => (dispatch) => {
  fetch('http://localhost:7000/api/tasks', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      } else return res.json();
    })
    .then((tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      dispatch({
        type: taskConstants.READ_TASKS,
        payload: tasks,
      });
    })
    .catch((error) => {
      dispatch({
        type: taskConstants.READ_TASKS_FAIL,
        payload: {
          error,
        },
      });
    });
};
