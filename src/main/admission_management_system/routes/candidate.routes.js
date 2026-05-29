'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/candidate.controller');

router.get('/:sbd/:maToHop', controller.getResult);

module.exports = router;
