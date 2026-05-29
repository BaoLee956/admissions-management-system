'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/officer.controller');
const validatorMiddleware = require('../middlewares/validator.middleware');

// Import bộ đôi middleware xác thực và phân quyền
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// ============================================
// PROFILE MANAGEMENT
// ============================================

// GET - Lấy danh sách hồ sơ chờ duyệt (Cán bộ và Admin đều có quyền xem)
router.get(
  '/profiles/pending', 
  verifyToken, 
  authorizeRoles(['OFFICER', 'ADMIN']), 
  controller.getPendingProfiles
);

// PUT - Cập nhật trạng thái hồ sơ
router.put(
  '/profiles/:maHoSo/status', 
  verifyToken, 
  authorizeRoles(['OFFICER', 'ADMIN']), 
  validatorMiddleware, 
  controller.updateProfileStatus
);

// ============================================
// APPROVAL REQUESTS MANAGEMENT
// ============================================

// GET - Lấy danh sách yêu cầu chờ xử lý
router.get(
  '/requests/pending', 
  verifyToken, 
  authorizeRoles(['OFFICER', 'ADMIN']), 
  controller.getPendingRequests
);

// POST - Tạo yêu cầu phê duyệt mới (chỉnh sửa/xóa hồ sơ)
router.post(
  '/requests', 
  verifyToken, 
  authorizeRoles(['OFFICER']), // Chỉ riêng Cán bộ tạo yêu cầu lên Admin
  validatorMiddleware, 
  controller.createRequest
);

// PUT - Xử lý yêu cầu phê duyệt
router.put(
  '/requests/:id/handle', 
  verifyToken, 
  authorizeRoles(['ADMIN']), // Chỉ Admin mới có quyền phê duyệt yêu cầu này
  validatorMiddleware, 
  controller.handleApprovalRequest
);

// ============================================
// HEALTH CHECK
// ============================================

router.get('/', controller.index);

module.exports = router;