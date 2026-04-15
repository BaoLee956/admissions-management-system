'use strict';

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'ams',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  dialect: process.env.DB_DIALECT || 'postgres',
};
