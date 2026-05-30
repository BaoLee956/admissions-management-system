'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const xlsx = require('xlsx');
const db = require('../models');
const { Nganh, Khoa, DotTuyenSinh, HoSoNhapHoc, GiayToDinhKem, YeuCauPheDuyet, ThiSinh, NhanVien, KetQuaXetTuyen, NganhHoc, NhomQuyen } = db;

module.exports = {
  // =========================
  // ĐĂNG NHẬP ADMIN (FR-ADM-01)
  // =========================
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Thiếu email hoặc mật khẩu' });
      }

      // Tìm nhân viên theo email
      const employee = await NhanVien.findOne({ where: { email: email } });
      if (!employee) {
        return res.status(400).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
      }

      // So sánh mật khẩu (lưu ý dữ liệu seed mật khẩu đang là văn bản thường)
      if (employee.matKhau !== password) {
        return res.status(400).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
      }

      // Tìm nhóm quyền tương ứng để lấy tên quyền (role)
      const group = await NhomQuyen.findByPk(employee.maNhom);
      const role = group ? group.tenNhom.toUpperCase() : 'OFFICER';

      // Tạo JWT Token chứa id, maNhom và role của nhân viên, thời hạn 1 ngày
      const token = jwt.sign(
        { id: employee.maNhanVien, maNhom: employee.maNhom, role: role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        token: token,
        role: role,
        user: {
          maNhanVien: employee.maNhanVien,
          email: employee.email,
          hoTen: employee.hoTen,
          maNhom: employee.maNhom,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  },

  // =========================
  // IMPORT THÍ SINH TỪ EXCEL (FR-ADM-03)
  // =========================
  async importCandidates(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Vui lòng tải lên một tệp Excel.' });
      }

      // Đọc file Excel tạm
      const filePath = req.file.path;
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      
      // Sử dụng raw: false để giữ định dạng văn bản (tránh mất số 0 ở đầu SBD/CCCD)
      const dataExcel = xlsx.utils.sheet_to_json(sheet, { raw: false });
      
      // 1. Log hàng đầu tiên để kiểm tra cấu trúc dữ liệu parse được
      console.log('Parsed Excel first row:', dataExcel[0]);

      if (dataExcel.length === 0) {
        // Xóa file tạm trước khi trả về
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        return res.status(400).json({ success: false, message: 'File Excel rỗng.' });
      }

      let successCount = 0;

      // Đọc toàn bộ điểm chuẩn các ngành trong database để phục vụ so sánh/xác định trạng thái
      const listNganhHoc = await NganhHoc.findAll();
      const nganhHocMap = new Map();
      listNganhHoc.forEach((nh) => {
        nganhHocMap.set(String(nh.maNganh).trim(), Number(nh.diemChuan || 0));
      });

      // 3. Sử dụng vòng lặp for...of để xử lý await insert/update đồng bộ từng dòng
      for (const row of dataExcel) {
        // Ánh xạ cột hỗ trợ đầy đủ các tiêu đề tiếng Việt có dấu
        const getVal = (exactKey, fallbackKeys = []) => {
          if (row[exactKey] !== undefined) {
            return row[exactKey];
          }
          for (const key of fallbackKeys) {
            if (row[key] !== undefined) {
              return row[key];
            }
          }
          // Fallback đối chiếu không phân biệt hoa thường và khoảng trắng
          const normalizedTarget = exactKey.toLowerCase().replace(/\s+/g, '');
          const foundKey = Object.keys(row).find(
            (k) => k.toLowerCase().replace(/\s+/g, '') === normalizedTarget
          );
          if (foundKey !== undefined) {
            return row[foundKey];
          }
          return null;
        };

        const sbd = String(getVal('SBD', ['sbd', 'sobaodanh']) || '').trim();
        const hoTen = String(getVal('Họ Tên', ['hoten', 'hovaten', 'name']) || '').trim();
        const cccd = String(getVal('CCCD', ['cccd', 'socccd', 'cmnd']) || '').trim();
        
        // Bắt buộc phải có SBD, Họ tên và CCCD
        if (!sbd || !hoTen || !cccd) {
          continue;
        }

        // Đọc các thông tin bổ sung, nếu thiếu điền mặc định
        const ngaySinhVal = getVal('Ngày Sinh', ['ngaysinh', 'dob']);
        const ngaySinh = ngaySinhVal ? new Date(ngaySinhVal) : new Date('2005-01-01');

        const gioiTinhVal = String(getVal('Giới Tính', ['gioitinh', 'gender']) || '').toLowerCase();
        const gioiTinh = gioiTinhVal.includes('nữ') || gioiTinhVal.includes('nu') || gioiTinhVal.includes('female') || gioiTinhVal === 'false' ? false : true;

        const sdt = String(getVal('Số Điện Thoại', ['sdt', 'sodienthoai', 'phone']) || sbd).trim();
        const email = String(getVal('Email', ['email', 'thu']) || `candidate_${sbd}@example.com`).trim();
        const diaChi = String(getVal('Địa Chỉ', ['diachi', 'address']) || 'Hà Nội').trim();
        const khuVuc = String(getVal('Khu Vực', ['khuvuc', 'region']) || 'KV3').trim();
        const doiTuongUuTien = String(getVal('Đối Tượng Ưu Tiên', ['doituonguutien', 'doi-tuong', 'priority', 'doituong']) || 'ND3').trim();

        // Điểm thi
        const diemToan = Number(getVal('Toán', ['diemtoan', 'toan', 'math']) || 0);
        const diemLy = Number(getVal('Lý', ['diemly', 'ly', 'physics']) || 0);
        const diemHoa = Number(getVal('Hóa', ['diemhoa', 'hoa', 'chemistry']) || 0);
        const diemCong = Number(getVal('Điểm Cộng', ['diemcong', 'cong', 'bonus']) || 0);
        
        let tongDiem = Number(getVal('Tổng Điểm', ['tongdiem', 'tong', 'total']) || 0);
        if (!tongDiem) {
          tongDiem = Number((diemToan + diemLy + diemHoa + diemCong).toFixed(2));
        }

        const maNganh = String(getVal('Mã Ngành', ['manganh', 'nganh', 'major']) || '').trim();

        // Xác định trạng thái kết quả xét tuyển
        let trangThai = 'KHÔNG TRÚNG TUYỂN';
        if (maNganh) {
          const diemChuan = nganhHocMap.get(maNganh);
          if (diemChuan !== undefined) {
            if (tongDiem >= diemChuan) {
              trangThai = 'TRÚNG TUYỂN';
            }
          } else {
            trangThai = 'TRÚNG TUYỂN';
          }
        }

        // 4. Logic kiểm tra trùng SBD: update nếu đã tồn tại, tạo mới nếu chưa
        let candidate = await ThiSinh.findOne({ where: { sbd: sbd } });
        if (candidate) {
          await candidate.update({
            hoTen,
            ngaySinh,
            gioiTinh,
            sdt,
            cccd,
            email,
            diaChi,
            khuVuc,
            doiTuongUuTien,
          });
        } else {
          await ThiSinh.create({
            sbd,
            hoTen,
            ngaySinh,
            gioiTinh,
            sdt,
            cccd,
            email,
            diaChi,
            khuVuc,
            doiTuongUuTien,
            otp_code: '',
            otp_expires: new Date(),
          });
        }

        if (maNganh) {
          let result = await KetQuaXetTuyen.findOne({ where: { sbd: sbd } });
          if (result) {
            await result.update({
              maNganh,
              diemToan,
              diemLy,
              diemHoa,
              diemCong,
              tongDiem,
              trangThai,
            });
          } else {
            await KetQuaXetTuyen.create({
              sbd,
              maNganh,
              diemToan,
              diemLy,
              diemHoa,
              diemCong,
              tongDiem,
              trangThai,
            });
          }
        }

        successCount++;
      }

      // Xóa file Excel tạm sau khi xử lý xong
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(200).json({
        success: true,
        message: 'Import danh sách thí sinh thành công!',
        data: {
          importedCount: successCount,
        },
      });
    } catch (error) {
      console.error('Error in importCandidates:', error);
      // Đảm bảo file được xóa nếu lỗi xảy ra giữa chừng
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống khi import dữ liệu.',
        error: error.message,
      });
    }
  },

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