'use strict';

const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/result', verifyToken, resultController.getAdmissionResult);

module.exports = router;
