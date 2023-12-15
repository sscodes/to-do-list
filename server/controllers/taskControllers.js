const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

const createTask = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please add required task details.');
  }
  const task = await Task.create({
    user: req.user.id,
    taskName: req.body.taskName,
    taskDetail: req.body.taskDetail,
    deadline: req.body.deadline,
  });

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400);
    throw new Error('Invalid request.');
  }
});

const readTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findOne({ user: req.user.id });
  if (tasks) {
    res.status(201).json(tasks);
  } else {
    res.status(400);
    throw new Error('Invalid request.');
  }
});

//Just updating done status
const updateTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  if (user._id != task.user.toString()) {
    res.status(400);
    throw new Error('Not authorized.');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (updatedTask) {
    res.status(201).json(updatedTask);
  } else {
    res.status(400);
    throw new Error('Invalid request.');
  }
});

const deleteTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  if (user._id != task.user.toString()) {
    res.status(400);
    throw new Error('Not authorized.');
  }

  const deletedTask = await Task.findByIdAndDelete(req.params.id, req.body);
  if (deletedTask) {
    res.status(201).json(deletedTask);
  } else {
    res.status(400);
    throw new Error('Invalid request.');
  }
});

module.exports = {
  createTask,
  readTasks,
  updateTasks,
  deleteTasks,
};
