'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/candidate.controller');

// 1. Import các middleware bảo mật
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');
// 2. Import middleware upload kết nối Cloudinary (Đã làm ở Bước 4)
const upload = require('../middlewares/upload.middleware');

// ============================================
// CANDIDATE PORTAL ROUTES
// ============================================

// API Tra cứu kết quả xét tuyển
router.get(
  '/me/admission-result', 
  verifyToken, 
  authorizeRoles(['CANDIDATE']), 
  controller.getAdmissionResult
);

// API Upload file giấy tờ (Đã mở comment và thêm middleware upload)
// 'file' là key (tên trường) mà Frontend phải gửi lên qua form-data
router.post(
  '/me/documents', 
  verifyToken, 
  authorizeRoles(['CANDIDATE']), 
  upload.single('file'), 
  controller.uploadDocument
);

module.exports = router;