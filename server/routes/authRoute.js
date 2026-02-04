const express = require('express');
const router = express.Router();

const { sendOtp, verifyOtp } = require('../controllers/authController');

//otp
router.post('/send-code', sendOtp);
router.post('/verify-code', verifyOtp);

module.exports = router;