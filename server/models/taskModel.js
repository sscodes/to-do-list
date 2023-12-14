const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Add Task Name'],
    },
    taskDetail: {
      type: String,
      required: [true, 'Add Task Description'],
    },
    deadline: {
      type: Date,
      required: [true, 'Add Deadline Date'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
