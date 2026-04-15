'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/candidate', require('./candidate.routes'));
router.use('/officer', require('./officer.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
