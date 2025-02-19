const taskKeys = {
  all: ['tasks'],
};
taskKeys.readTasks = [...taskKeys.all, 'readTasks'];

const authKeys = {
  all: ['users']
}
authKeys.createUser = [...authKeys.all, 'createUser'];
authKeys.deleteUser = [...authKeys.all, 'deleteUser'];

export { taskKeys, authKeys };
