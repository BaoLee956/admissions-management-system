'use strict';

const path = require('path');
const envResult = require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log("EMAIL_USER:", process.env.EMAIL_USER); 
console.log("EMAIL_PASS:", process.env.EMAIL_APP_PASSWORD);
const app = require('./app');

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});
