'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// Ép toàn bộ các tuyến đường bên dưới phải đi qua bộ lọc cấu hình ADMIN
router.use(verifyToken, authorizeRoles(['ADMIN']));

// Sau dòng router.use này, toàn bộ API bên dưới mặc định đã được bảo vệ an toàn
router.post('/imports', controller.importExcel);
router.put('/rounds/:id/status', controller.updateRoundStatus);
router.post('/users', controller.createNewUser);

const AdminController = require('../controllers/admin.controller');

router.post('/nganh', AdminController.createNganh);

router.get('/nganh', AdminController.getAllNganh);

router.get('/nganh/:id', AdminController.getDetailNganh);

router.put('/nganh/:id', AdminController.updateNganh);

router.delete('/nganh/:id', AdminController.deleteNganh);

router.post(
  '/dot-tuyen-sinh',
  AdminController.createDotTuyenSinh
);

router.get(
  '/dot-tuyen-sinh',
  AdminController.getAllDotTuyenSinh
);

router.get(
  '/dot-tuyen-sinh/:id',
  AdminController.getDetailDotTuyenSinh
);

router.put(
  '/dot-tuyen-sinh/:id',
  AdminController.updateDotTuyenSinh
);

router.delete(
  '/dot-tuyen-sinh/:id',
  AdminController.deleteDotTuyenSinh
);

router.post(
  '/upload-giay-to',
  AdminController.uploadGiayTo
);

router.get(
  '/requests/pending',
  AdminController.getPendingRequests
);

router.put(
  '/requests/:id/handle',
  AdminController.handleApprovalRequest
);

module.exports = router;
