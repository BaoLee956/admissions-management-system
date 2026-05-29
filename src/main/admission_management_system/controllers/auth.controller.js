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

  // 2. Xử lý xác minh OTP
  async verifyOTP(req, res) {
    try {
      const { sbd, otpCode } = req.body;

      // Cắm cờ theo dõi lúc nhận OTP từ FE gửi lên
      console.log(`\n🟡 [XÁC THỰC] Frontend vừa gửi lên SBD: '${sbd}', OTP: '${otpCode}'`);
      console.log(`🟡 [KHO RAM TRƯỚC KHI TÌM] Các SBD đang có:`, Array.from(otpStorage.keys()));

      if (!sbd || !otpCode) {
        return res.status(400).json({ error: { message: 'Vui lòng cung cấp SBD và mã OTP' } });
      }

      const keyToFind = sbd.toString();
      const storedData = otpStorage.get(keyToFind);

      if (!storedData) {
        console.log(`🔴 [LỖI] Không tìm thấy key '${keyToFind}' trong kho RAM!`);
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Mã OTP không tồn tại hoặc đã hết hạn' } });
      }

      if (Date.now() > storedData.expiresAt) {
        console.log(`🔴 [LỖI] Mã của '${keyToFind}' đã bị quá hạn 5 phút!`);
        otpStorage.delete(keyToFind);
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Mã OTP đã hết hạn (quá 5 phút)' } });
      }

      if (storedData.otpCode !== otpCode.toString()) {
        console.log(`🔴 [LỖI] Mã FE gửi (${otpCode}) không khớp với mã trong RAM (${storedData.otpCode})!`);
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Mã OTP không chính xác' } });
      }

      console.log(`🟢 [THÀNH CÔNG] Đăng nhập hợp lệ! Đang xóa mã khỏi RAM...`);
      otpStorage.delete(keyToFind);

      const thiSinh = await authService.verifySBDAndCCCD(sbd, req.body.cccd || "123456789012"); 
      
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
      console.error(error);
      return res.status(500).json({ error: { message: 'Lỗi máy chủ khi xác thực OTP' } });
    }
  }
};