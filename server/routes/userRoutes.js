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

router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get('/getme', protect, readUser);

module.exports = router;
