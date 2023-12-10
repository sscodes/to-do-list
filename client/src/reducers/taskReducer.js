import { taskConstants } from '../actions/constants';

const inistate = {
  tasks: [],
  task: {},
};

const taskReducer = (state = inistate, action) => {
  switch (action.type) {
    case taskConstants.READ_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case taskConstants.ADD_TASK:
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
