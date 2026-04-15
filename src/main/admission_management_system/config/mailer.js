'use strict';

module.exports = {
  host: process.env.MAIL_HOST || 'smtp.example.com',
  port: Number(process.env.MAIL_PORT || 587),
  user: process.env.MAIL_USER || '',
  pass: process.env.MAIL_PASS || '',
  from: process.env.MAIL_FROM || 'no-reply@example.com',
};
