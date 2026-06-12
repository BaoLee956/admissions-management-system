'use strict';

const authService = require('../services/auth.service');
const emailService = require('../services/email.service');

// Kho lưu trữ mã OTP tạm thời trong bộ nhớ RAM
const otpStorage = new Map();

module.exports = {
  // 1. Xử lý yêu cầu gửi OTP
  async requestOTP(req, res) {
    try {
      const sbd = req.body.sbd ? String(req.body.sbd).trim() : '';
      const cccd = req.body.cccd ? String(req.body.cccd).trim() : '';

      if (!sbd || !cccd) {
        return res.status(400).json({ error: { message: 'Vui lòng cung cấp SBD và CCCD' } });
      }

      const thiSinh = await authService.verifySBDAndCCCD(sbd, cccd);

      const otpCode = emailService.generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; 
      
      const keyToSave = sbd.toString();
      otpStorage.set(keyToSave, { otpCode, expiresAt });

      // Cắm cờ theo dõi lúc lưu OTP
      console.log(`\n🟢 [TẠO OTP] Đã lưu OTP cho SBD: '${keyToSave}'. Mã: ${otpCode}`);
      console.log(`🟢 [KHO RAM HIỆN TẠI] Các SBD đang có:`, Array.from(otpStorage.keys()));

      await emailService.sendOTPEmail(thiSinh.email, otpCode);

      return res.status(200).json({
        success: true,
        message: `Mã OTP đã được gửi đến email ${thiSinh.email}`
      });
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  },

  async verifyOtp(req, res) {
    try {
      const sbd = req.body.sbd ? String(req.body.sbd).trim() : '';
      const otp = req.body.otp ? String(req.body.otp).trim() : (req.body.otpCode ? String(req.body.otpCode).trim() : '');

      if (!sbd || !otp) {
        return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp SBD và mã OTP' });
      }

      const keyToFind = sbd;
      const storedData = otpStorage.get(keyToFind);

      if (!storedData) {
        return res.status(400).json({ status: 'error', message: 'Mã OTP không chính xác' });
      }

      if (Date.now() > storedData.expiresAt) {
        otpStorage.delete(keyToFind);
        return res.status(400).json({ status: 'error', message: 'Mã OTP không chính xác' });
      }

      if (storedData.otpCode !== otp) {
        return res.status(400).json({ status: 'error', message: 'Mã OTP không chính xác' });
      }

      // Xóa OTP khỏi RAM để tránh dùng lại
      otpStorage.delete(keyToFind);

      // Lấy thông tin thí sinh để đưa vào payload
      const { ThiSinh } = require('../models');
      const thiSinh = await ThiSinh.findOne({ where: { sbd } });

      const token = authService.generateToken({
        sbd: sbd,
        cccd: thiSinh ? thiSinh.cccd : null,
        hoTen: thiSinh ? thiSinh.hoTen : null,
        role: 'CANDIDATE',
      });

      return res.status(200).json({
        status: 'success',
        token: token,
        user: {
          sbd: sbd,
          hoTen: thiSinh ? thiSinh.hoTen : null,
          role: 'CANDIDATE',
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Lỗi máy chủ khi xác thực OTP' });
    }
  },

  async verifyOTP(req, res) {
    return this.verifyOtp(req, res);
  },

  async internalLogin(req, res) {
    try {
      const email = req.body.email ? String(req.body.email).trim() : '';
      const password = req.body.password ? String(req.body.password).trim() : '';

      if (!email || !password) {
        return res.status(400).json({ error: { message: 'Vui lòng cung cấp email và mật khẩu' } });
      }

      const { NhanVien, NhomQuyen } = require('../models');
      const nhanVien = await NhanVien.findOne({
        where: { email, trangThai: true },
        include: [{
          model: NhomQuyen,
          as: 'nhomQuyen'
        }]
      });

      if (!nhanVien) {
        return res.status(401).json({ error: { message: 'Email hoặc mật khẩu không chính xác' } });
      }

      if (nhanVien.matKhau !== password) {
        return res.status(401).json({ error: { message: 'Email hoặc mật khẩu không chính xác' } });
      }

      // Convert role to uppercase (e.g. ADMIN, OFFICER) for authorization compatibility
      const role = nhanVien.nhomQuyen ? nhanVien.nhomQuyen.tenNhom.toUpperCase() : '';

      const token = authService.generateToken({
        maNhanVien: nhanVien.maNhanVien,
        email: nhanVien.email,
        hoTen: nhanVien.hoTen,
        role: role
      });

      return res.status(200).json({
        success: true,
        token,
        role,
        user: {
          maNhanVien: nhanVien.maNhanVien,
          email: nhanVien.email,
          hoTen: nhanVien.hoTen
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: { message: 'Lỗi máy chủ khi đăng nhập' } });
    }
  }
};