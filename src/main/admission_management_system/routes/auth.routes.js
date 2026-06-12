'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// [POST] Yêu cầu cấp mã OTP
router.post('/candidates/otp', authController.requestOTP);

// [POST] Xác minh mã OTP
router.post('/candidates/verify', authController.verifyOTP);
router.post('/verify-otp', authController.verifyOtp);

// [POST] Đăng nhập nội bộ cho cán bộ & admin
router.post('/internal/login', authController.internalLogin);

module.exports = router;