'use strict';

const { ThiSinh } = require('../models');
const { evaluateAdmission } = require('../services/admission.service');

module.exports = {
  // =========================
  // GET /candidate/:sbd/:maToHop
  // =========================
  async getResult(req, res) {
    try {
      const { sbd, maToHop } = req.params;

      if (!sbd || !maToHop) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu SBD hoặc mã tổ hợp',
        });
      }

      // 1. Kiểm tra thí sinh tồn tại
      const thiSinh = await ThiSinh.findOne({
        where: { sbd: Number(sbd) },
      });

      if (!thiSinh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thí sinh',
        });
      }

      // 2. GỌI SERVICE
      const result = await evaluateAdmission({
        sbd: Number(sbd),
        maToHop: Number(maToHop),
      });

      return res.json({
        success: true,
        data: {
          sbd: thiSinh.sbd,
          hoTen: thiSinh.hoTen,
          diemTong: result.diemTong,
          diemChuan: result.diemChuan,
          trangThai: result.trangThai,
        },
      });

    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  },
};