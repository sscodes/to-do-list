const asyncHandler = require('express-async-handler');

const Task = require('../models/taskModel');

const createTasks = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400);
    throw new Error('Please add required task details.');
  }
  const task = await Task.create({
    taskName: req.body.taskName,
    taskDetail: req.body.taskDetail,
    deadline: req.body.deadline,
  });
  res.status(200).json(task);
});

const readTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

const updateTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

const deleteTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  const deletedTask = await Task.findByIdAndDelete(req.params.id, req.body);
  res.status(200).json(deletedTask);
});

module.exports = {
  createTasks,
  readTasks,
  updateTasks,
  deleteTasks,
};
