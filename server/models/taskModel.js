const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
