import { taskConstants } from './constants';

export const updateTask = (change, token, id) => (dispatch) => {
  dispatch({
    type: taskConstants.UPDATE_TASK_LOADING,
  });
  fetch(`https://to-do-list-api-ddho.onrender.com/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(change),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      } else return res.json();
    })
    .then((tasks) => {
      if (change.done !== undefined)
        dispatch({
          type: taskConstants.UPDATE_TASK,
          payload: tasks,
          doneType: change.done,
        });
      else
        dispatch({
          type: taskConstants.UPDATE_TASK,
          payload: tasks,
        });
    })
    .catch((error) => {
      dispatch({
        type: taskConstants.UPDATE_TASK_FAIL,
        payload: {
          error,
        },
      });
    });
};

export const deleteTaskAction = (token, id) => (dispatch) => {
  dispatch({
    type: taskConstants.DELETE_TASK_LOADING,
  });
  fetch(`https://to-do-list-api-ddho.onrender.com/api/tasks/${id}`, {
    method: 'DELETE',
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
      dispatch({
        type: taskConstants.DELETE_TASK,
        payload: tasks,
      });
    })
    .catch((error) => {
      dispatch({
        type: taskConstants.DELETE_TASK_FAIL,
        payload: {
          error,
        },
      });
    });
};
