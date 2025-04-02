const taskKeys = {
  all: ['tasks'],
};
taskKeys.readTasks = [...taskKeys.all, 'readTasks'];

const authKeys = {
  all: ['users']
}
authKeys.createUser = [...authKeys.all, 'createUser'];
authKeys.deleteUser = [...authKeys.all, 'deleteUser'];
authKeys.loginUser = [...authKeys.all, 'loginUser'];
authKeys.updateUserPassword = [...authKeys.all, 'updateUserPassword'];
authKeys.sendOTPMail = [...authKeys.all, 'send-otp-mail'];

export { taskKeys, authKeys };
