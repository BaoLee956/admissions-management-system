'use strict';

const { ThiSinh } = require('../models');
// Nếu bạn đã viết file admission.service rồi thì giữ nguyên, nếu chưa thì tạm comment dòng dưới lại để tránh lỗi:
// const { evaluateAdmission } = require('../services/admission.service'); 

module.exports = {
  // =========================
  // 1. Hàm mock data phục vụ Tuần 2 (Test FE Xác nhận nhập học)
  // =========================
  async getAdmissionResult(req, res) {
      try {
          return res.status(200).json({
              data: {
                  hoTen: "Nguyễn Văn A",
                  nganhTrúngTuyen: "Công nghệ thông tin",
                  diemChuan: 24.0,
                  diemCuaBan: 24.5,
                  trangThai: "TRUNG_TUYEN",
                  daXacNhanNhapHoc: false
              }
          });
      } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  },

  // =========================
  // 2. Hàm getResult cũ của bạn (GET /candidate/:sbd/:maToHop)
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

      const thiSinh = await ThiSinh.findOne({
        where: { sbd: Number(sbd) },
      });

      if (!thiSinh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thí sinh',
        });
      }

      // Giả sử service trả về kết quả
      /* const result = await evaluateAdmission({
        sbd: Number(sbd),
        maToHop: Number(maToHop),
      }); 
      */

      return res.json({
        success: true,
        data: {
          sbd: thiSinh.sbd,
          hoTen: thiSinh.hoTen,
          // Tạm để mock nếu chưa nối service
          diemTong: 24.5, 
          diemChuan: 24.0,
          trangThai: 'TRUNG_TUYEN',
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