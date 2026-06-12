'use strict';

const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// 1. Import object cấu hình multer (Đổi tên thành upload cho dễ hiểu)
const upload = require('../middlewares/upload.middleware');

// 2. Khai báo các trường file sẽ nhận từ người dùng (dựa theo code controller của bạn)
const uploadFields = upload.fields([
  { name: 'cccd', maxCount: 1 },
  { name: 'hocBa', maxCount: 1 },
  { name: 'giayTotNghiep', maxCount: 1 },
  { name: 'minhChungUuTien', maxCount: 1 }
]);

// 3. Chỉ CANDIDATE mới được upload hồ sơ; controller sẽ dùng req.user.sbd để xác định hồ sơ của ai
router.post('/upload', verifyToken, authorizeRoles(['CANDIDATE']), uploadFields, enrollmentController.submitDocuments);

module.exports = router;