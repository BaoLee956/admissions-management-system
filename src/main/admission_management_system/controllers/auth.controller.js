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

      // Tạo Token JWT
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ sbd: sbd }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({
        status: 'success',
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Lỗi máy chủ khi xác thực OTP' });
    }
  },

  async verifyOTP(req, res) {
    return this.verifyOtp(req, res);
  }
};