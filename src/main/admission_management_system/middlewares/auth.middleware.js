'use strict';

const jwt = require('jsonwebtoken');

/**
 * Middleware kiểm tra tính hợp lệ của JWT Token
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Không tìm thấy mã token xác thực hợp lệ' }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    // Kiểm tra tài khoản nội bộ có bị khóa (trangThai = false) hay không
    if (decoded.maNhanVien) {
      const { NhanVien } = require('../models');
      const user = await NhanVien.findByPk(decoded.maNhanVien);
      if (!user) {
        return res.status(401).json({
          error: { code: 'USER_NOT_FOUND', message: 'Tài khoản không tồn tại trong hệ thống.' }
        });
      }
      if (!user.trangThai) {
        return res.status(403).json({
          error: { code: 'USER_LOCKED', message: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.' }
        });
      }
    }

    next();
  } catch (error) {
    return res.status(401).json({
      error: { code: 'TOKEN_INVALID_EXPIRED', message: 'Mã xác thực token không chính xác hoặc đã hết hạn' }
    });
  }
};

/**
 * Middleware phân quyền truy cập dựa trên danh sách vai trò cho phép
 * @param {string[]} allowedRoles - Danh sách các quyền hợp lệ (CANDIDATE, OFFICER, ADMIN)
 */
const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'Bạn không có quyền truy cập vào chức năng này' }
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: { code: 'ACTION_DENIED', message: 'Tài khoản của bạn không đủ đặc quyền thực hiện hành động này' }
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
};