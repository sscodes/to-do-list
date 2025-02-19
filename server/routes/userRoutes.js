const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  createUser,
  loginUser,
  deleteUser,
  updateUser,
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
router.put('/updatepassword/:email', updateUser);
router.delete('/deleteuser/:id', protect, deleteUser);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) =>
    res.redirect(
      `https://to-do-list-fyvc.onrender.com?name=${req.user.name}&token=${generateToken(
        req.user._id
      )}`
    )
);

module.exports = router;
