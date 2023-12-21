const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  createUser,
  loginUser,
  readUser,
  //   updateUsers,
  //   deleteUsers,
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const passport = require('passport');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get('/getme', protect, readUser);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) =>
    res.redirect(
      `http://localhost:3000?name=${req.user.name}&token=${generateToken(
        req.user._id
      )}`
    )
);

module.exports = router;
