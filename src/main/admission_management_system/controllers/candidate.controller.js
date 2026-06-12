'use strict';

const { ThiSinh } = require('../models');
// Import service để lưu thông tin file vào database
const uploadService = require('../services/upload.service');

module.exports = {
  // =========================
  // 1. Hàm mock data phục vụ Tuần 2
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
  // 2. Hàm getResult cũ của bạn
  // =========================
  async getResult(req, res) {
    try {
      const { sbd, maToHop } = req.params;
      const formattedSbd = sbd ? String(sbd).trim() : '';

      if (!formattedSbd || !maToHop) {
        return res.status(400).json({ success: false, message: 'Thiếu SBD hoặc mã tổ hợp' });
      }

      const thiSinh = await ThiSinh.findOne({ where: { sbd: formattedSbd } });

      if (!thiSinh) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy thí sinh' });
      }

      return res.json({
        success: true,
        data: {
          sbd: thiSinh.sbd,
          hoTen: thiSinh.hoTen,
          diemTong: 24.5, 
          diemChuan: 24.0,
          trangThai: 'TRUNG_TUYEN',
        },
      });

    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  },

  // =========================
  // 3. Hàm xử lý Upload (Mới thêm)
  // =========================
  async uploadDocument(req, res) {
    try {
      // 1. Kiểm tra xem Cloudinary có xử lý thành công không
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Không tìm thấy file tải lên!' });
      }

      // 2. Lấy link Cloudinary URL và tên gốc của file
      const fileUrl = req.file.path;
      const fileName = req.file.originalname;

      // 3. Lấy ID thí sinh từ Token (middleware verifyToken thường gắn thông tin vào req.user)
      // Chú ý: Cấu trúc req.user phụ thuộc vào cách bạn decode JWT ở middleware
      const thiSinhId = req.user ? req.user.id : null; 

      // 4. Gọi Service để cất thông tin vào DB
      const savedRecord = await uploadService.saveFileRecord({ fileUrl, fileName, thiSinhId });

      // 5. Trả kết quả thành công cho Client
      return res.status(200).json({
        success: true,
        message: 'Tải lên tài liệu thành công!',
        data: savedRecord
      });

    } catch (error) {
      console.error('Lỗi controller upload:', error);
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  }
};