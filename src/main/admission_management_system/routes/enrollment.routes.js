'use strict';

const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const uploadFields = require('../middlewares/upload.middleware');

router.post('/upload', verifyToken, uploadFields, enrollmentController.submitDocuments);

module.exports = router;
