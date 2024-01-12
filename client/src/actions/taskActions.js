import { taskConstants } from './constants';

export const createTask = (task, token) => (dispatch) => {
  fetch('https://to-do-list-api-ddho.onrender.com/api/tasks', {
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
    .then((tasks) => {
      dispatch({
        type: taskConstants.ADD_TASK,
        payload: tasks,
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
  fetch('https://to-do-list-api-ddho.onrender.com/api/tasks', {
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

export const changeTaskDoneStatus = (change, token, id) => (dispatch) => {
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
      dispatch({
        type: taskConstants.UPDATE_TASK,
        payload: tasks,
        doneType: change.done,
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
