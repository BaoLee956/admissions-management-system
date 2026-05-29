'use strict';

const db = require('../models');

const {
  Nganh,
  Khoa,
  DotTuyenSinh,
  HoSoNhapHoc,
  GiayToDinhKem,
  YeuCauPheDuyet,
  ThiSinh,
} = db;

class AdminController {
  // =========================
  // CREATE NGANH
  // =========================
  static async createNganh(req, res) {
    try {
      const { tenNganh, maKhoa } = req.body;

      if (!tenNganh || !maKhoa) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu tenNganh hoặc maKhoa',
        });
      }

      const khoa = await Khoa.findByPk(maKhoa);

      if (!khoa) {
        return res.status(404).json({
          success: false,
          message: 'Khoa không tồn tại',
        });
      }

      const newNganh = await Nganh.create({
        tenNganh,
        maKhoa,
      });

      return res.status(201).json({
        success: true,
        message: 'Tạo ngành thành công',
        data: newNganh,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // GET ALL NGANH
  // =========================
  static async getAllNganh(req, res) {
    try {
      const listNganh = await Nganh.findAll({
        include: [
          {
            model: Khoa,
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: listNganh,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // GET DETAIL NGANH
  // =========================
  static async getDetailNganh(req, res) {
    try {
      const { id } = req.params;

      const nganh = await Nganh.findByPk(id, {
        include: [
          {
            model: Khoa,
          },
        ],
      });

      if (!nganh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy ngành',
        });
      }

      return res.status(200).json({
        success: true,
        data: nganh,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // UPDATE NGANH
  // =========================
  static async updateNganh(req, res) {
    try {
      const { id } = req.params;

      const { tenNganh, maKhoa } = req.body;

      const nganh = await Nganh.findByPk(id);

      if (!nganh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy ngành',
        });
      }

      if (maKhoa) {
        const khoa = await Khoa.findByPk(maKhoa);

        if (!khoa) {
          return res.status(404).json({
            success: false,
            message: 'Khoa không tồn tại',
          });
        }
      }

      await nganh.update({
        tenNganh: tenNganh || nganh.tenNganh,
        maKhoa: maKhoa || nganh.maKhoa,
      });

      return res.status(200).json({
        success: true,
        message: 'Cập nhật ngành thành công',
        data: nganh,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // DELETE NGANH
  // =========================
  static async deleteNganh(req, res) {
    try {
      const { id } = req.params;

      const nganh = await Nganh.findByPk(id);

      if (!nganh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy ngành',
        });
      }

      await nganh.destroy();

      return res.status(200).json({
        success: true,
        message: 'Xóa ngành thành công',
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // CREATE DOT TUYEN SINH
  // =========================
  static async createDotTuyenSinh(req, res) {
    try {
      const {
        nam,
        tenDot,
        thoiGianBatDau,
        thoiGianKetThuc,
      } = req.body;

      if (
        !nam ||
        !tenDot ||
        !thoiGianBatDau ||
        !thoiGianKetThuc
      ) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu dữ liệu đầu vào',
        });
      }

      if (
        new Date(thoiGianBatDau) >=
        new Date(thoiGianKetThuc)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
        });
      }

      const newDot = await DotTuyenSinh.create({
        nam,
        tenDot,
        thoiGianBatDau,
        thoiGianKetThuc,
      });

      return res.status(201).json({
        success: true,
        message: 'Tạo đợt tuyển sinh thành công',
        data: newDot,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // GET ALL DOT TUYEN SINH
  // =========================
  static async getAllDotTuyenSinh(req, res) {
    try {
      const listDot = await DotTuyenSinh.findAll({
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        success: true,
        data: listDot,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // GET DETAIL DOT TUYEN SINH
  // =========================
  static async getDetailDotTuyenSinh(req, res) {
    try {
      const { id } = req.params;

      const dot = await DotTuyenSinh.findByPk(id);

      if (!dot) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đợt tuyển sinh',
        });
      }

      return res.status(200).json({
        success: true,
        data: dot,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // UPDATE DOT TUYEN SINH
  // =========================
  static async updateDotTuyenSinh(req, res) {
    try {
      const { id } = req.params;

      const {
        nam,
        tenDot,
        thoiGianBatDau,
        thoiGianKetThuc,
      } = req.body;

      const dot = await DotTuyenSinh.findByPk(id);

      if (!dot) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đợt tuyển sinh',
        });
      }

      const startDate =
        thoiGianBatDau || dot.thoiGianBatDau;

      const endDate =
        thoiGianKetThuc || dot.thoiGianKetThuc;

      if (
        new Date(startDate) >=
        new Date(endDate)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
        });
      }

      await dot.update({
        nam: nam || dot.nam,
        tenDot: tenDot || dot.tenDot,
        thoiGianBatDau: startDate,
        thoiGianKetThuc: endDate,
      });

      return res.status(200).json({
        success: true,
        message: 'Cập nhật đợt tuyển sinh thành công',
        data: dot,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // DELETE DOT TUYEN SINH
  // =========================
  static async deleteDotTuyenSinh(req, res) {
    try {
      const { id } = req.params;

      const dot = await DotTuyenSinh.findByPk(id);

      if (!dot) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đợt tuyển sinh',
        });
      }

      await dot.destroy();

      return res.status(200).json({
        success: true,
        message: 'Xóa đợt tuyển sinh thành công',
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // UPLOAD GIAY TO
  // =========================
  static async uploadGiayTo(req, res) {
    const transaction = await db.sequelize.transaction();

    try {
      const {
        maHoSo,
        maLoai,
        duongDanFile,
        ghiChuLoi,
      } = req.body;

      if (!maHoSo || !maLoai || !duongDanFile) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: 'Thiếu dữ liệu đầu vào',
        });
      }

      const hoSo = await HoSoNhapHoc.findByPk(maHoSo, {
        transaction,
      });

      if (!hoSo) {
        await transaction.rollback();

        return res.status(404).json({
          success: false,
          message: 'Hồ sơ không tồn tại',
        });
      }

      const existedGiayTo = await GiayToDinhKem.findOne({
        where: {
          maHoSo,
          maLoai,
        },
        transaction,
      });

      if (existedGiayTo) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: 'Giấy tờ này đã được upload',
        });
      }

      const giayTo = await GiayToDinhKem.create(
        {
          maHoSo,
          maLoai,
          duongDanFile,
          ghiChuLoi,
        },
        {
          transaction,
        }
      );

      await hoSo.update(
        {
          trangThai: 'SUBMITTED',
        },
        {
          transaction,
        }
      );

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: 'Upload giấy tờ thành công',
        data: giayTo,
      });
    } catch (error) {
      await transaction.rollback();

      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message,
      });
    }
  }

  // =========================
  // GET PENDING REQUESTS
  // =========================
  static async getPendingRequests(req, res) {
    try {
      const pendingRequests = await YeuCauPheDuyet.findAll({
        where: { trangThai: 'PENDING' },
        include: [
          {
            model: HoSoNhapHoc,
            attributes: ['maHoSo', 'ngayNop', 'trangThai'],
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
        message: 'Lấy danh sách yêu cầu chờ duyệt thành công',
        count: pendingRequests.length,
        data: pendingRequests,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách yêu cầu',
        error: error.message,
      });
    }
  }

  // =========================
  // HANDLE APPROVAL REQUEST
  // =========================
  static async handleApprovalRequest(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const { id } = req.params;
      const { action, reason } = req.body; // action: 'APPROVED' or 'REJECTED'

      if (!id || isNaN(id)) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'ID yêu cầu không hợp lệ',
        });
      }

      if (!action || !['APPROVED', 'REJECTED'].includes(action)) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Hành động không hợp lệ (APPROVED hoặc REJECTED)',
        });
      }

      if (action === 'REJECTED' && (!reason || reason.trim() === '')) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp lý do từ chối',
        });
      }

      const yeuCau = await YeuCauPheDuyet.findByPk(id, { transaction });
      if (!yeuCau) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy yêu cầu phê duyệt',
        });
      }

      if (yeuCau.trangThai !== 'PENDING') {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Yêu cầu này đã được xử lý trước đó (Trạng thái hiện tại: ${yeuCau.trangThai})`,
        });
      }

      const hoSo = await HoSoNhapHoc.findByPk(yeuCau.maHoSo, { transaction });

      if (action === 'REJECTED') {
        yeuCau.trangThai = 'REJECTED';
        yeuCau.liDoTuChoi = reason.trim();
        await yeuCau.save({ transaction });

        // Nếu Admin từ chối yêu cầu BỔ SUNG hoặc TỪ CHỐI của Cán bộ,
        // thì chuyển hồ sơ về PENDING để xem xét lại
        if (hoSo && (yeuCau.loaiYeuCau === 'BÔ_SUNG' || yeuCau.loaiYeuCau === 'TỪ_CHỐI')) {
          hoSo.trangThai = 'PENDING';
          await hoSo.save({ transaction });
        }

        await transaction.commit();
        return res.status(200).json({
          success: true,
          message: 'Từ chối yêu cầu thành công',
          data: yeuCau,
        });
      }

      // Trường hợp APPROVED
      yeuCau.trangThai = 'APPROVED';
      await yeuCau.save({ transaction });

      if (!hoSo) {
        // Nếu không tìm thấy hồ sơ liên quan, chỉ lưu trạng thái yêu cầu
        await transaction.commit();
        return res.status(200).json({
          success: true,
          message: 'Phê duyệt yêu cầu thành công (Không tìm thấy hồ sơ đi kèm)',
          data: yeuCau,
        });
      }

      if (yeuCau.loaiYeuCau === 'XÓA') {
        // Thực hiện xóa hồ sơ
        await hoSo.destroy({ transaction });
        // Do có cascade delete ở database level, yeuCau này cũng sẽ bị xóa.
        // Nhưng ta đã lưu giao dịch, trả về thông tin đã xử lý thành công.
        await transaction.commit();
        return res.status(200).json({
          success: true,
          message: 'Phê duyệt yêu cầu thành công. Đã xóa hồ sơ.',
          data: {
            id: yeuCau.id,
            maHoSo: yeuCau.maHoSo,
            loaiYeuCau: 'XÓA',
            trangThai: 'APPROVED',
          },
        });
      } else if (yeuCau.loaiYeuCau === 'SỬA') {
        // Chuyển hồ sơ về trạng thái PENDING để có thể sửa
        hoSo.trangThai = 'PENDING';
        await hoSo.save({ transaction });
      } else if (yeuCau.loaiYeuCau === 'BÔ_SUNG') {
        // Đồng ý với yêu cầu bổ sung của Officer
        hoSo.trangThai = 'REQUEST_SUPPLEMENT';
        await hoSo.save({ transaction });
      } else if (yeuCau.loaiYeuCau === 'TỪ_CHỐI') {
        // Đồng ý từ chối hồ sơ
        hoSo.trangThai = 'REJECTED';
        await hoSo.save({ transaction });
      }

      await transaction.commit();
      return res.status(200).json({
        success: true,
        message: `Phê duyệt yêu cầu thành công (Loại yêu cầu: ${yeuCau.loaiYeuCau})`,
        data: yeuCau,
      });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi xử lý yêu cầu phê duyệt',
        error: error.message,
      });
    }
  }
}

module.exports = AdminController;