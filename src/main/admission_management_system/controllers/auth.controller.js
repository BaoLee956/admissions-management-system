'use strict';

const { verifySBDAndCCCD } = require('../services/auth.service');

module.exports = {
  async index(_req, res) {
    return res.json({ ok: true });
  },

  async verify(req, res) {
    try {
      const { sbd, cccd } = req.body;

      if (!sbd || !cccd) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu SBD hoặc CCCD',
        });
      }

      const result = await verifySBDAndCCCD(sbd, cccd);

      return res.json({
        success: true,
        message: 'Xác thực thành công',
        data: result,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};