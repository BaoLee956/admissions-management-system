'use strict';

const jwt = require('jsonwebtoken');

/**
 * Middleware kiểm tra tính hợp lệ của JWT Token
 */
const verifyToken = (req, res, next) => {
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