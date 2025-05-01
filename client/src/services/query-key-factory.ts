export const taskKeys = {
  all: ['tasks'],
  readTasks: () => [...taskKeys.all, 'readTasks'],
};

export const authKeys = {
  all: ['users'],
  createUser: () => [...authKeys.all, 'createUser'],
  deleteUser: () => [...authKeys.all, 'deleteUser'],
  loginUser: () => [...authKeys.all, 'loginUser'],
  updateUserPassword: () => [...authKeys.all, 'updateUserPassword'],
  sendOTPMail: () => [...authKeys.all, 'send-otp-mail'],
};
