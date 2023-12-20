const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  readUser,
  //   updateUsers,
  //   deleteUsers,
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const passport = require('passport');

router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get('/getme', protect, readUser);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/redirect', (req, res) => {
  res.send('you have reached the callback URI.');
});

module.exports = router;
