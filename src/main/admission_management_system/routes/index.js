'use strict';

const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const resultRoutes = require('./result.routes');
const enrollmentRoutes = require('./enrollment.routes');
// router.use('/auth', require('./auth.routes'));
router.use('/v1/auth', authRoutes);
router.use('/v1/candidates', resultRoutes);
router.use('/v1/enrollment', enrollmentRoutes);
// router.use('/candidate', require('./candidate.routes'));
// router.use('/officer', require('./officer.routes'));
// router.use('/admin', require('./admin.routes'));

module.exports = router;
