'use strict';

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// Bảo vệ toàn bộ admin routes: phải đăng nhập và phải có role ADMIN
router.use(verifyToken, authorizeRoles(['ADMIN']));

// NGANH
router.post('/nganh', AdminController.createNganh);
router.get('/nganh', AdminController.getAllNganh);
router.get('/nganh/:id', AdminController.getDetailNganh);
router.put('/nganh/:id', AdminController.updateNganh);
router.delete('/nganh/:id', AdminController.deleteNganh);

// DOT TUYEN SINH
router.post('/dot-tuyen-sinh', AdminController.createDotTuyenSinh);
router.get('/dot-tuyen-sinh', AdminController.getAllDotTuyenSinh);
router.get('/dot-tuyen-sinh/:id', AdminController.getDetailDotTuyenSinh);
router.put('/dot-tuyen-sinh/:id', AdminController.updateDotTuyenSinh);
router.delete('/dot-tuyen-sinh/:id', AdminController.deleteDotTuyenSinh);

// GIAY TO & REQUESTS
router.post('/upload-giay-to', AdminController.uploadGiayTo);
router.get('/requests/pending', AdminController.getPendingRequests);
router.put('/requests/:id/handle', AdminController.handleApprovalRequest);

// NHAN VIEN (USER MANAGEMENT)
router.get('/users', AdminController.getAllUsers);
router.post('/users', AdminController.createUser);
router.put('/users/:id/toggle', AdminController.toggleUserStatus);
router.put('/users/:id/reset-password', AdminController.resetUserPassword);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;