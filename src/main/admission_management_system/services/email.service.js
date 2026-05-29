'use strict';

const transporter = require('../config/mailer');

/**
 * Tạo mã OTP ngẫu nhiên gồm 6 chữ số
 * @returns {string}
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Gửi email chứa mã OTP xác thực cho Thí sinh
 * @param {string} toEmail - Email nhận mã
 * @param {string} otpCode - Mã OTP cần gửi
 */
const sendOTPEmail = async (toEmail, otpCode) => {
  const mailOptions = {
    from: process.env.MAIL_FROM || '"Hệ thống Tuyển sinh" <no-reply@tuyensinh.edu.vn>',
    to: toEmail,
    subject: '[Hệ thống Tuyển sinh] - Mã OTP Xác thực Tài khoản',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #003366; text-align: center;">MÃ XÁC THỰC OTP</h2>
        <p>Chào Thí sinh,</p>
        <p>Bạn đang thực hiện thao tác truy cập vào Hệ thống quản lý tuyển sinh. Vui lòng sử dụng mã OTP dưới đây để hoàn tất quá trình đăng nhập:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #cc0000; letter-spacing: 5px; padding: 10px 20px; background-color: #f5f5f5; border: 1px dashed #cccccc; border-radius: 4px;">
            ${otpCode}
          </span>
        </div>
        <p style="color: #555555; font-size: 13px;">Mã OTP này có hiệu lực trong vòng <b>60 giây</b>; Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
        <hr style="border: 0; border-top: 1px solid #eeeeee;" />
        <p style="font-size: 11px; color: #999999; text-align: center;">Đây là email tự động từ Hệ thống quản lý tuyển sinh và hồ sơ sinh viên đầu vào.</p>
      </div>
    `
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  generateOTP,
  sendOTPEmail,
};