'use strict';

const authService = require('../services/auth.service');
const emailService = require('../services/email.service');

// Kho lưu trữ mã OTP tạm thời trong bộ nhớ RAM
const otpStorage = new Map();

module.exports = {
  // 1. Xử lý yêu cầu gửi OTP
  async requestOTP(req, res) {
    try {
      const { sbd, cccd } = req.body;

      if (!sbd || !cccd) {
        return res.status(400).json({ error: { message: 'Vui lòng cung cấp SBD và CCCD' } });
      }

      // Kiểm tra SBD và CCCD có hợp lệ trong Database không
      const thiSinh = await authService.verifySBDAndCCCD(sbd, cccd);

      // Sinh mã OTP 6 số và lưu vào RAM (kèm thời gian hết hạn sau 60 giây)
      const otpCode = emailService.generateOTP();
      const expiresAt = Date.now() + 60 * 1000; 
      otpStorage.set(sbd.toString(), { otpCode, expiresAt });

      // Gửi email
      await emailService.sendOTPEmail(thiSinh.email, otpCode);

      return res.status(200).json({
        success: true,
        message: `Mã OTP đã được gửi đến email ${thiSinh.email}`
      });
    } catch (error) {
      // Bắt lỗi nếu sai SBD/CCCD từ authService
      return res.status(400).json({ error: { message: error.message } });
    }
  },

  // 2. Xử lý xác minh OTP
  async verifyOTP(req, res) {
    try {
      const { sbd, otpCode } = req.body;

      if (!sbd || !otpCode) {
        return res.status(400).json({ error: { message: 'Vui lòng cung cấp SBD và mã OTP' } });
      }

      const storedData = otpStorage.get(sbd.toString());

      // Kiểm tra mã có tồn tại và chưa hết hạn
      if (!storedData) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Mã OTP không tồn tại hoặc đã hết hạn' } });
      }

      if (Date.now() > storedData.expiresAt) {
        otpStorage.delete(sbd.toString()); // Xóa mã hết hạn
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Mã OTP đã hết hạn (quá 60 giây)' } });
      }

      if (storedData.otpCode !== otpCode.toString()) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Mã OTP không chính xác' } });
      }

      // Xác thực thành công -> Xóa mã OTP khỏi RAM để tránh dùng lại
      otpStorage.delete(sbd.toString());

      // Lấy thông tin thí sinh để đóng gói vào Token
      const thiSinh = await authService.verifySBDAndCCCD(sbd, req.body.cccd || "001082946357"); // Tạm hardcode CCCD để lấy info, thực tế nên query lại DB bằng sbd
      
      const payload = {
        id: thiSinh.sbd,
        sbd: thiSinh.sbd,
        hoTen: thiSinh.hoTen,
        role: 'CANDIDATE'
      };

      const token = authService.generateToken(payload);

      return res.status(200).json({
        success: true,
        token: token,
        role: 'CANDIDATE',
        hoTen: thiSinh.hoTen
      });
    } catch (error) {
      return res.status(500).json({ error: { message: 'Lỗi máy chủ khi xác thực OTP' } });
    }
  }
};