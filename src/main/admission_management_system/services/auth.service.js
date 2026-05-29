'use strict';

const jwt = require('jsonwebtoken'); // 1. Bổ sung thư viện mã hóa JWT
const { ThiSinh } = require('../models');

// ===== VALIDATE =====
const validateSBD = (sbd) => {
  if (!sbd) return false;
  return /^\d{8}$/.test(String(sbd).trim());
};

const validateCCCD = (cccd) => {
  if (!cccd) return false;
  return /^\d{12}$/.test(String(cccd).trim());
};

// ===== BUSINESS LOGIC =====
const verifySBDAndCCCD = async (sbd, cccd) => {
  // validate format
  if (!validateSBD(sbd)) {
    throw new Error('SBD không hợp lệ (phải 8 chữ số)');
  }

  if (!validateCCCD(cccd)) {
    throw new Error('CCCD không hợp lệ (phải 12 chữ số)');
  }

  // check DB
  const thiSinh = await ThiSinh.findOne({
    where: {
      sbd: Number(sbd),
      cccd: String(cccd).trim(),
    },
  });

  if (!thiSinh) {
    throw new Error('Không tìm thấy thí sinh');
  }

  return {
    sbd: thiSinh.sbd,
    hoTen: thiSinh.hoTen,
    cccd: thiSinh.cccd,
    email: thiSinh.email,
  };
};

/**
 * 2. Bổ sung hàm ký số và sinh chuỗi xác thực JWT Token
 * @param {Object} payload - Dữ liệu người dùng cần đóng gói (sbd; role; hoTen; email;...)
 * @returns {string} - Chuỗi Token đã mã hóa bảo mật
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// 3. Cập nhật đối tượng xuất bản để Controller có thể gọi đồng thời cả 2 chức năng
module.exports = {
  verifySBDAndCCCD,
  generateToken,
};