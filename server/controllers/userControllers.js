const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const fetch = require('cross-fetch');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const createUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please add required user details.');
  }

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid request.');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please add required user details.');
  }

  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials.');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { password: hashedPassword },
    {
      new: true,
    }
  );

  if (updatedUser)
    res.status(201).json({ msg: 'Password updated successfully.' });
  else {
    res.status(400);
    throw new Error('Update unsuccessful, try again.');
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user)
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  let deletedUser = null;

  fetch(`https://to-do-list-api-ddho.onrender.com/api/tasks/deleteusertasks/${req.params.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      } else return res.json();
    })
    .then(async (tasks) => {
      if (tasks)
        deletedUser = await User.findByIdAndDelete(req.params.id, req.body);
      if (deletedUser)
        res.status(201).json({ msg: 'User deleted successfully.' });
    })
    .catch((err) => {
      throw new Error(`${err.message} Delete unsuccessful, try again.`);
    });
});

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
