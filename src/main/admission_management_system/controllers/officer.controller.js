'use strict';

const { HoSoNhapHoc, GiayToDinhKem, ThiSinh, YeuCauPheDuyet } = require('../models');

module.exports = {
  // ======================================
  // 1. LẤY DANH SÁCH HỒ SƠ CHỜ DUYỆT
  // ======================================
  async getPendingProfiles(req, res) {
    try {
      const pendingProfiles = await HoSoNhapHoc.findAll({
        where: { trangThai: 'PENDING' },
        include: [
          {
            model: ThiSinh,
            attributes: ['sbd', 'hoTen', 'email', 'sdt'],
            as: 'ThiSinh',
          },
          {
            model: GiayToDinhKem,
            attributes: ['id', 'maLoai', 'duongDanFile', 'ghiChuLoi'],
            as: 'GiayToDinhKems',
          },
        ],
        order: [['ngayNop', 'ASC']],
      });

      if (!pendingProfiles || pendingProfiles.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'Không có hồ sơ chờ duyệt',
          data: [],
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách hồ sơ chờ duyệt thành công',
        count: pendingProfiles.length,
        data: pendingProfiles,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách hồ sơ',
        error: error.message,
      });
    }
  },

  // ======================================
  // 2. CẬP NHẬT TRẠNG THÁI HỒ SƠ/FILE
  // ======================================
  async updateProfileStatus(req, res) {
    try {
      const { maHoSo } = req.params;
      const { status, reason, liDoYeuCau } = req.body;

      // Kiểm tra maHoSo
      if (!maHoSo || isNaN(maHoSo)) {
        return res.status(400).json({
          success: false,
          message: 'Mã hồ sơ không hợp lệ',
        });
      }

      // Kiểm tra status
      const validStatuses = ['APPROVED', 'VALID', 'REJECTED', 'REQUEST_SUPPLEMENT'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Trạng thái không hợp lệ. Chấp nhận: ${validStatuses.join(', ')}`,
        });
      }

      // Nếu từ chối hoặc yêu cầu bổ sung, phải có lý do
      if ((status === 'REJECTED' || status === 'REQUEST_SUPPLEMENT') && !reason) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp lý do từ chối/yêu cầu bổ sung',
        });
      }

      // Tìm hồ sơ
      const hoSo = await HoSoNhapHoc.findByPk(maHoSo);
      if (!hoSo) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy hồ sơ',
        });
      }

      // Cập nhật trạng thái hồ sơ
      let newStatus = status === 'APPROVED' ? 'APPROVED' : 'APPROVED'; // Normalize
      if (status === 'REJECTED' || status === 'REQUEST_SUPPLEMENT') {
        newStatus = status;
      }

      hoSo.trangThai = newStatus;
      await hoSo.save();

      // Nếu là yêu cầu bổ sung, lưu vào YeuCauPheDuyet
      if (status === 'REQUEST_SUPPLEMENT' || status === 'REJECTED') {
        await YeuCauPheDuyet.create({
          maHoSo,
          maNhanVien: req.user?.maNhanVien || 1, // Lấy từ token hoặc mặc định
          loaiYeuCau: status === 'REQUEST_SUPPLEMENT' ? 'BÔ_SUNG' : 'TỪ_CHỐI',
          liDoYeuCau: reason,
          trangThai: 'PENDING',
        });
      }

      // Cập nhật ghiChuLoi cho các file nếu cần
      if (reason) {
        await GiayToDinhKem.update(
          { ghiChuLoi: reason },
          { where: { maHoSo } }
        );
      }

      return res.status(200).json({
        success: true,
        message: `Cập nhật trạng thái thành công (${newStatus})`,
        data: {
          maHoSo,
          trangThai: newStatus,
          lyDo: reason || null,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật trạng thái',
        error: error.message,
      });
    }
  },

  // ======================================
  // 3. LẤY DANH SÁCH CÁC YÊU CẦU CHƯA XỬ LÝ
  // ======================================
  async getPendingRequests(req, res) {
    try {
      const pendingRequests = await YeuCauPheDuyet.findAll({
        where: { trangThai: 'PENDING' },
        include: [
          {
            model: HoSoNhapHoc,
            attributes: ['maHoSo', 'ngayNop'],
            include: [
              {
                model: ThiSinh,
                attributes: ['sbd', 'hoTen', 'email'],
              },
            ],
          },
        ],
        order: [['createdAt', 'ASC']],
      });

      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách yêu cầu thành công',
        count: pendingRequests.length,
        data: pendingRequests,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách yêu cầu',
        error: error.message,
      });
    }
  },

  // ======================================
  // 4. XỬ LÝ YÊU CẦU (PHÊ DUYỆT/TỪ CHỐI)
  // ======================================
  async handleApprovalRequest(req, res) {
    try {
      const { id } = req.params;
      const { action } = req.body; // 'APPROVED' hoặc 'REJECTED'

      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID yêu cầu không hợp lệ',
        });
      }

      if (!action || !['APPROVED', 'REJECTED'].includes(action)) {
        return res.status(400).json({
          success: false,
          message: 'Hành động không hợp lệ (APPROVED hoặc REJECTED)',
        });
      }

      // Tìm yêu cầu
      const yeuCau = await YeuCauPheDuyet.findByPk(id);
      if (!yeuCau) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy yêu cầu',
        });
      }

      // Cập nhật trạng thái yêu cầu
      yeuCau.trangThai = action;
      if (action === 'REJECTED') {
        yeuCau.liDoTuChoi = req.body.reason || 'Từ chối xử lý';
      }
      await yeuCau.save();

      // Cập nhật trạng thái hồ sơ nếu phê duyệt
      if (action === 'APPROVED') {
        const hoSo = await HoSoNhapHoc.findByPk(yeuCau.maHoSo);
        if (hoSo) {
          hoSo.trangThai = 'APPROVED';
          await hoSo.save();
        }
      }

      return res.status(200).json({
        success: true,
        message: `Xử lý yêu cầu thành công (${action})`,
        data: yeuCau,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi xử lý yêu cầu',
        error: error.message,
      });
    }
  },

  async index(_req, res) {
    return res.json({ ok: true });
  },
};
