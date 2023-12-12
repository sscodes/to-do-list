const express = require('express');
const router = express.Router();
const {
  createTasks,
  readTasks,
  updateTasks,
  deleteTasks,
} = require('../controllers/taskControllers');

router.route('/').post(createTasks).get(readTasks);
router.route('/:id').put(updateTasks).delete(deleteTasks);

module.exports = router;
