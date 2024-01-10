const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controllers/mailControllers');

router.get('/:type/sendOTP/:email', sendOTP);

module.exports = router;
