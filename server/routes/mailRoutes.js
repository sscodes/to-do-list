const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controllers/mailControllers');

router.get('/sendOTP/:email', sendOTP);

module.exports = router;
