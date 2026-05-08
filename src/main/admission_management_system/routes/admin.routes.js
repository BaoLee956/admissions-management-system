'use strict';

const express = require('express');
const router = express.Router();

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
module.exports = router;
