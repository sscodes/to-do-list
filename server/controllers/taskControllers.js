const asyncHandler = require('express-async-handler');

const createTasks = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.task) {
    res.status(400);
    throw new Error('Please add required task details.');
  }
  res.status(200).json({
    message: 'Create goal',
  });
});

const readTasks = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Read Tasks',
  });
});

const updateTasks = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id}`,
  });
});

const deleteTasks = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete goal ${req.params.id}`,
  });
});

module.exports = {
  createTasks,
  readTasks,
  updateTasks,
  deleteTasks,
};
