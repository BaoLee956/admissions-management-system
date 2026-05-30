'use strict';

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const uploadFields = require('../middlewares/upload.middleware');
const uploadExcel = uploadFields.uploadExcel;

const checkAdminRole = (req, res, next) => {
  if (!req.user || !req.user.maNhom) {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền thực hiện chức năng này.',
    });
  }
  next();
};

// AUTH
router.post('/login', AdminController.login);
router.post('/import', verifyToken, checkAdminRole, uploadExcel.single('file'), AdminController.importCandidates);

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

module.exports = router;