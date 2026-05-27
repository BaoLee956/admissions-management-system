'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/officer.controller');
const validatorMiddleware = require('../middlewares/validator.middleware');

// ============================================
// PROFILE MANAGEMENT
// ============================================

// GET - Lấy danh sách hồ sơ chờ duyệt
router.get('/profiles/pending', controller.getPendingProfiles);

// PUT - Cập nhật trạng thái hồ sơ
router.put('/profiles/:maHoSo/status', validatorMiddleware, controller.updateProfileStatus);

// ============================================
// APPROVAL REQUESTS MANAGEMENT
// ============================================

// GET - Lấy danh sách yêu cầu chờ xử lý
router.get('/requests/pending', controller.getPendingRequests);

// POST - Tạo yêu cầu phê duyệt mới (chỉnh sửa/xóa hồ sơ)
router.post('/requests', validatorMiddleware, controller.createRequest);

// PUT - Xử lý yêu cầu phê duyệt
router.put('/requests/:id/handle', validatorMiddleware, controller.handleApprovalRequest);

// ============================================
// HEALTH CHECK
// ============================================

// GET - Check endpoint
router.get('/', controller.index);

module.exports = router;
