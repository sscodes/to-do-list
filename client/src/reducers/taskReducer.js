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

const taskReducer = (state = inistate, action) => {
  switch (action.type) {
    case taskConstants.READ_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.READ_TASKS_FAIL:
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: [],
      };
    case taskConstants.ADD_TASK:
      notifySuccess('Task added successfully!');
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.ADD_TASK_FAIL:
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: JSON.parse(localStorage.getItem('tasks')),
      };
    case taskConstants.UPDATE_TASK:
      notifySuccess(`Task Marked As ${action.doneType ? 'Done' : 'Pending'}`);
      if (action.doneType) new Audio(taskDone).play();
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.UPDATE_TASK_FAIL:
      notifyError(action.payload.error.message);
      return {
        ...state,
        tasks: JSON.parse(localStorage.getItem('tasks')),
      };
    case taskConstants.DELETE_TASK:
      notifySuccess('Task Deleted!');
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.DELETE_TASK_FAIL:
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
