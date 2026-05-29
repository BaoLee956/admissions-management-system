'use strict';

const db = require('../models');
const { Nganh, Khoa, DotTuyenSinh, HoSoNhapHoc, GiayToDinhKem, YeuCauPheDuyet, ThiSinh } = db;

module.exports = {
  // =========================
  // QUẢN LÝ NGÀNH
  // =========================
  async createNganh(req, res) {
    try {
      const { tenNganh, maKhoa } = req.body;
      if (!tenNganh || !maKhoa) return res.status(400).json({ success: false, message: 'Thiếu tenNganh hoặc maKhoa' });
      const khoa = await Khoa.findByPk(maKhoa);
      if (!khoa) return res.status(404).json({ success: false, message: 'Khoa không tồn tại' });
      
      const newNganh = await Nganh.create({ tenNganh, maKhoa });
      return res.status(201).json({ success: true, message: 'Tạo ngành thành công', data: newNganh });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async getAllNganh(req, res) {
    try {
      const listNganh = await Nganh.findAll({ include: [{ model: Khoa }] });
      return res.status(200).json({ success: true, data: listNganh });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async getDetailNganh(req, res) {
    try {
      const nganh = await Nganh.findByPk(req.params.id, { include: [{ model: Khoa }] });
      if (!nganh) return res.status(404).json({ success: false, message: 'Không tìm thấy ngành' });
      return res.status(200).json({ success: true, data: nganh });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async updateNganh(req, res) {
    try {
      const { tenNganh, maKhoa } = req.body;
      const nganh = await Nganh.findByPk(req.params.id);
      if (!nganh) return res.status(404).json({ success: false, message: 'Không tìm thấy ngành' });
      
      if (maKhoa) {
        const khoa = await Khoa.findByPk(maKhoa);
        if (!khoa) return res.status(404).json({ success: false, message: 'Khoa không tồn tại' });
      }
      
      await nganh.update({ tenNganh: tenNganh || nganh.tenNganh, maKhoa: maKhoa || nganh.maKhoa });
      return res.status(200).json({ success: true, message: 'Cập nhật thành công', data: nganh });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async deleteNganh(req, res) {
    try {
      const nganh = await Nganh.findByPk(req.params.id);
      if (!nganh) return res.status(404).json({ success: false, message: 'Không tìm thấy ngành' });
      await nganh.destroy();
      return res.status(200).json({ success: true, message: 'Xóa ngành thành công' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  // =========================
  // QUẢN LÝ ĐỢT TUYỂN SINH
  // =========================
  async createDotTuyenSinh(req, res) {
    try {
      const { nam, tenDot, thoiGianBatDau, thoiGianKetThuc } = req.body;
      if (!nam || !tenDot || !thoiGianBatDau || !thoiGianKetThuc) {
        return res.status(400).json({ success: false, message: 'Thiếu dữ liệu đầu vào' });
      }
      if (new Date(thoiGianBatDau) >= new Date(thoiGianKetThuc)) {
        return res.status(400).json({ success: false, message: 'TG bắt đầu phải < TG kết thúc' });
      }
      
      const newDot = await DotTuyenSinh.create({ nam, tenDot, thoiGianBatDau, thoiGianKetThuc });
      return res.status(201).json({ success: true, message: 'Tạo đợt thành công', data: newDot });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async getAllDotTuyenSinh(req, res) {
    try {
      const listDot = await DotTuyenSinh.findAll({ order: [['createdAt', 'DESC']] });
      return res.status(200).json({ success: true, data: listDot });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async getDetailDotTuyenSinh(req, res) {
    try {
      const dot = await DotTuyenSinh.findByPk(req.params.id);
      if (!dot) return res.status(404).json({ success: false, message: 'Không tìm thấy đợt' });
      return res.status(200).json({ success: true, data: dot });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async updateDotTuyenSinh(req, res) {
    try {
      const { nam, tenDot, thoiGianBatDau, thoiGianKetThuc } = req.body;
      const dot = await DotTuyenSinh.findByPk(req.params.id);
      if (!dot) return res.status(404).json({ success: false, message: 'Không tìm thấy đợt' });

      const startDate = thoiGianBatDau || dot.thoiGianBatDau;
      const endDate = thoiGianKetThuc || dot.thoiGianKetThuc;
      if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ success: false, message: 'TG bắt đầu phải < TG kết thúc' });
      }

      await dot.update({ nam: nam || dot.nam, tenDot: tenDot || dot.tenDot, thoiGianBatDau: startDate, thoiGianKetThuc: endDate });
      return res.status(200).json({ success: true, message: 'Cập nhật đợt thành công', data: dot });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async deleteDotTuyenSinh(req, res) {
    try {
      const dot = await DotTuyenSinh.findByPk(req.params.id);
      if (!dot) return res.status(404).json({ success: false, message: 'Không tìm thấy đợt' });
      await dot.destroy();
      return res.status(200).json({ success: true, message: 'Xóa đợt thành công' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  // =========================
  // UPLOAD & DUYỆT YÊU CẦU
  // =========================
  async uploadGiayTo(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const { maHoSo, maLoai, duongDanFile, ghiChuLoi } = req.body;
      if (!maHoSo || !maLoai || !duongDanFile) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Thiếu dữ liệu đầu vào' });
      }

      const hoSo = await HoSoNhapHoc.findByPk(maHoSo, { transaction });
      if (!hoSo) {
        await transaction.rollback();
        return res.status(404).json({ success: false, message: 'Hồ sơ không tồn tại' });
      }

      const existedGiayTo = await GiayToDinhKem.findOne({ where: { maHoSo, maLoai }, transaction });
      if (existedGiayTo) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Giấy tờ này đã được upload' });
      }

      const giayTo = await GiayToDinhKem.create({ maHoSo, maLoai, duongDanFile, ghiChuLoi }, { transaction });
      await hoSo.update({ trangThai: 'SUBMITTED' }, { transaction });
      await transaction.commit();

      return res.status(201).json({ success: true, message: 'Upload thành công', data: giayTo });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async getPendingRequests(req, res) {
    try {
      const pendingRequests = await YeuCauPheDuyet.findAll({
        where: { trangThai: 'PENDING' },
        include: [{
          model: HoSoNhapHoc,
          attributes: ['maHoSo', 'ngayNop', 'trangThai'],
          include: [{ model: ThiSinh, attributes: ['sbd', 'hoTen', 'email'] }],
        }],
        order: [['createdAt', 'ASC']],
      });
      return res.status(200).json({ success: true, count: pendingRequests.length, data: pendingRequests });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  async handleApprovalRequest(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const { action, reason } = req.body;
      if (!['APPROVED', 'REJECTED'].includes(action)) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Hành động không hợp lệ' });
      }

      const yeuCau = await YeuCauPheDuyet.findByPk(req.params.id, { transaction });
      if (!yeuCau) {
        await transaction.rollback();
        return res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu' });
      }

      if (action === 'REJECTED') {
        yeuCau.trangThai = 'REJECTED';
        yeuCau.liDoTuChoi = reason || '';
        await yeuCau.save({ transaction });
        await transaction.commit();
        return res.status(200).json({ success: true, message: 'Từ chối thành công', data: yeuCau });
      }

      yeuCau.trangThai = 'APPROVED';
      await yeuCau.save({ transaction });
      await transaction.commit();
      return res.status(200).json({ success: true, message: 'Phê duyệt thành công', data: yeuCau });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  }
};