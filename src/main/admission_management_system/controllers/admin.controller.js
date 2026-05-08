'use strict';

const db = require('../../models');

const {
  Nganh,
  Khoa,
  DotTuyenSinh,
  HoSoNhapHoc,
  GiayToDinhKem,
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
}

module.exports = AdminController;