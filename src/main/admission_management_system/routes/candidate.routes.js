'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/candidate.controller');

// 1. Import các middleware bảo mật vừa tạo
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// ============================================
// CANDIDATE PORTAL ROUTES
// ============================================

// API Tra cứu kết quả xét tuyển (Yêu cầu phải đăng nhập và phải có Role là CANDIDATE)
router.get(
  '/me/admission-result', 
  verifyToken, 
  authorizeRoles(['CANDIDATE']), 
  controller.getAdmissionResult
);

// Bạn sẽ áp dụng tương tự cho các route bảo mật khác ở Tuần 2 và Tuần 3:
// router.put('/me/confirm-enrollment', verifyToken, authorizeRoles(['CANDIDATE']), controller.confirmEnrollment);
// router.post('/me/documents', verifyToken, authorizeRoles(['CANDIDATE']), controller.uploadDocument);

module.exports = router;