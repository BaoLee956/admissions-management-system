'use strict';

const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const resultRoutes = require('./result.routes');
const enrollmentRoutes = require('./enrollment.routes');
const adminRoutes = require('./admin.routes');

router.use('/v1/auth', authRoutes);
router.use('/v1/candidates', resultRoutes);
router.use('/v1/enrollment', enrollmentRoutes);
router.use('/v1/admin', adminRoutes);

module.exports = router;
