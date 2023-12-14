const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Add name'],
    },
    email: {
      type: String,
      required: [true, 'Add email'],
    },
    password: {
      type: String,
      required: [true, 'Add password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
