'use strict';

const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const resultRoutes = require('./result.routes');
const enrollmentRoutes = require('./enrollment.routes');
const adminRoutes = require('./admin.routes');
const officerRoutes = require('./officer.routes');
const candidateRoutes = require('./candidate.routes');

// Public auth routes
router.use('/v1/auth', authRoutes);

// Candidate result lookup (verifyToken only - role checked per route)
router.use('/v1/candidates', resultRoutes);

// Candidate upload/enrollment
router.use('/v1/enrollment', enrollmentRoutes);

// Admin protected routes (ADMIN only – enforced inside admin.routes.js)
router.use('/v1/admin', adminRoutes);

// Officer protected routes (OFFICER + ADMIN – enforced inside officer.routes.js)
router.use('/v1/officer', officerRoutes);

// Candidate portal routes (CANDIDATE only – enforced inside candidate.routes.js)
router.use('/v1/candidate', candidateRoutes);

module.exports = router;
