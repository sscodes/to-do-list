const express = require('express');
const router = express.Router();
const {
  createTask,
  readTasks,
  updateTasks,
  deleteTasks,
} = require('../controllers/taskControllers');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createTask).get(protect, readTasks);
router.route('/:id').put(protect, updateTasks).delete(protect, deleteTasks);

module.exports = router;
