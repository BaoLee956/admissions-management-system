'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = require('./app');

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});
