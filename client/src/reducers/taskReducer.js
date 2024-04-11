import { toast } from 'react-toastify';
import { taskConstants } from '../actions/constants';
import taskDone from '../assets/TaskDone.wav';

const inistate = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const notificationProperties = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const notifyError = (error) => toast.error(error, notificationProperties);

const notifySuccess = (msg) => toast.success(msg, notificationProperties);

const notify = (message) =>
  toast(message, {
    position: 'top-center',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const taskReducer = (state = inistate, action) => {
  switch (action.type) {
    case taskConstants.READ_TASKS_LOADING:
      notify('Please wait while we fetch your tasks.');
      return {
        ...state,
      };
    case taskConstants.READ_TASKS:
      setTimeout(() => toast.dismiss(), 740);
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.READ_TASKS_FAIL:
      setTimeout(() => toast.dismiss(), 740);
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: [],
      };
    case taskConstants.ADD_TASK_LOADING:
      notify('Please wait while we add your task.');
      return {
        ...state,
      };
    case taskConstants.ADD_TASK:
      setTimeout(() => toast.dismiss(), 740);
      notifySuccess('Task added successfully!');
      if (localStorage.getItem('task')) localStorage.removeItem('task');
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.ADD_TASK_FAIL:
      setTimeout(() => toast.dismiss(), 740);
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: JSON.parse(localStorage.getItem('tasks')),
      };
    case taskConstants.UPDATE_TASK_LOADING:
      notify('Please wait while we update your task.');
      return {
        ...state,
      };
    case taskConstants.UPDATE_TASK:
      setTimeout(() => toast.dismiss(), 740);
      notifySuccess(`Task Marked As ${action.doneType ? 'Done' : 'Pending'}`);
      if (action.doneType) new Audio(taskDone).play();
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.UPDATE_TASK_FAIL:
      setTimeout(() => toast.dismiss(), 740);
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: JSON.parse(localStorage.getItem('tasks')),
      };
    case taskConstants.DELETE_TASK_LOADING:
      notify('Please wait while we delete your task.');
      return {
        ...state,
      };
    case taskConstants.DELETE_TASK:
      setTimeout(() => toast.dismiss(), 740);
      notifySuccess('Task Deleted!');
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.DELETE_TASK_FAIL:
      setTimeout(() => toast.dismiss(), 740);
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: JSON.parse(localStorage.getItem('tasks')),
      };
    default:
      return state;
  }
};

export default taskReducer;
