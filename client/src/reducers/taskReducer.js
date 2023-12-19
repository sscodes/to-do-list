import { toast } from 'react-toastify';
import { taskConstants } from '../actions/constants';

const inistate = {
  tasks: [],
  task: {},
};

const notificationProperties = {
  position: 'top-center',
  autoClose: 5000,
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
    case taskConstants.ADD_TASK:
      notifySuccess('Task added successfully!');
      return {
        ...state,
        task: action.payload,
      };
    case taskConstants.ADD_TASK_FAIL:
      notifyError(action.payload.error.message);
      return {
        ...state,
        task: {},
      };
    default:
      return state;
  }
};

export default taskReducer;
