'use strict';

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const validatorMiddleware = require('./middlewares/validator.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply validator middleware to all API routes
app.use('/api', validatorMiddleware);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);

module.exports = app;
