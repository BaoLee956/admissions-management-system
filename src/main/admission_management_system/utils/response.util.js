'use strict';

module.exports = {
  ok(res, data = null) {
    return res.json({ ok: true, data });
  },
  fail(res, message = 'Error', status = 400) {
    return res.status(status).json({ ok: false, message });
  },
};
