'use strict';

// ============================================
// REGEX PATTERNS
// ============================================
const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+84|0)[0-9]{9,10}$/,
  cccd: /^\d{9,12}$/,
  url: /^https?:\/\/.+/,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 */
const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
};

/**
 * Sanitize string - remove leading/trailing whitespace and dangerous characters
 */
const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;
  return value.trim().replace(/[<>]/g, '');
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  if (!email) return false;
  return REGEX.email.test(email);
};

/**
 * Validate phone format (Vietnam)
 */
const isValidPhone = (phone) => {
  if (!phone) return false;
  return REGEX.phone.test(phone);
};

/**
 * Validate CCCD/ID format
 */
const isValidCCCD = (cccd) => {
  if (!cccd) return false;
  return REGEX.cccd.test(String(cccd));
};

/**
 * Validate URL format
 */
const isValidUrl = (url) => {
  if (!url) return false;
  return REGEX.url.test(url);
};

/**
 * Validate required fields for admission profile
 */
const validateProfileData = (data) => {
  const errors = [];

  // Required fields for ThiSinh
  if (!data.sbd) errors.push('SBD (Số báo danh) không được để trống');
  if (!data.hoTen) errors.push('Họ tên không được để trống');
  if (!data.ngaySinh) errors.push('Ngày sinh không được để trống');
  if (data.gioiTinh === undefined || data.gioiTinh === null) {
    errors.push('Giới tính không được để trống');
  }

  // Validate email
  if (!data.email) {
    errors.push('Email không được để trống');
  } else if (!isValidEmail(data.email)) {
    errors.push('Định dạng email không hợp lệ');
  }

  // Validate phone
  if (!data.sdt) {
    errors.push('Số điện thoại không được để trống');
  } else if (!isValidPhone(data.sdt)) {
    errors.push('Số điện thoại không hợp lệ (định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx)');
  }

  // Validate CCCD
  if (!data.cccd) {
    errors.push('CCCD không được để trống');
  } else if (!isValidCCCD(data.cccd)) {
    errors.push('CCCD phải là 9-12 chữ số');
  }

  // Validate địa chỉ
  if (!data.diaChi) {
    errors.push('Địa chỉ không được để trống');
  }

  return errors;
};

/**
 * Validate file attachment data
 */
const validateFileData = (data) => {
  const errors = [];

  if (!data.maHoSo) errors.push('Mã hồ sơ không được để trống');
  if (!data.maLoai) errors.push('Mã loại giấy tờ không được để trống');
  if (!data.duongDanFile) {
    errors.push('Đường dẫn file không được để trống');
  } else if (!isValidUrl(data.duongDanFile) && !data.duongDanFile.includes('/')) {
    errors.push('Đường dẫn file không hợp lệ');
  }

  return errors;
};

/**
 * Main validator middleware
 */
module.exports = function validatorMiddleware(req, res, next) {
  const errors = [];
  const warnings = [];

  // ========== CHECK REQUEST BODY ==========
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    if (isEmpty(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Request body không được để trống',
      });
    }

    // ========== SANITIZE INPUTS ==========
    if (typeof req.body === 'object' && req.body !== null) {
      for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = sanitizeString(req.body[key]);
        }
      }
    }

    // ========== VALIDATE BASED ON ROUTE ==========

    // Profile creation/update validation
    if (
      req.path.includes('/profile') ||
      req.path.includes('/admission') ||
      req.body.sbd
    ) {
      const profileErrors = validateProfileData(req.body);
      errors.push(...profileErrors);
    }

    // File validation
    if (
      req.path.includes('/file') ||
      req.path.includes('/giayto') ||
      req.body.duongDanFile
    ) {
      const fileErrors = validateFileData(req.body);
      errors.push(...fileErrors);
    }

    // ========== VALIDATE DATA TYPES ==========
    if (req.body.sbd && isNaN(req.body.sbd)) {
      errors.push('SBD phải là số');
    }
    if (req.body.maHoSo && isNaN(req.body.maHoSo)) {
      errors.push('Mã hồ sơ phải là số');
    }
    if (req.body.maLoai && isNaN(req.body.maLoai)) {
      errors.push('Mã loại phải là số');
    }
    if (req.body.ngaySinh) {
      const dateObj = new Date(req.body.ngaySinh);
      if (isNaN(dateObj.getTime())) {
        errors.push('Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)');
      }
      if (dateObj > new Date()) {
        warnings.push('Ngày sinh trong tương lai');
      }
    }

    // ========== CHECK FOR DANGEROUS CONTENT ==========
    const bodyString = JSON.stringify(req.body);
    if (bodyString.includes('<script') || bodyString.includes('javascript:')) {
      errors.push('Dữ liệu chứa nội dung nguy hiểm (Script injection)');
    }

    // SQL injection check (basic)
    if (/(\bDROP\b|\bDELETE\b|\bINSERT\b|--|;)/i.test(bodyString)) {
      warnings.push('Dữ liệu có thể chứa SQL injection pattern');
    }
  }

  // ========== VALIDATE PARAMS ==========
  if (req.params) {
    for (const key in req.params) {
      if (key.includes('Id') || key.includes('id') || key.includes('ma')) {
        if (req.params[key] && isNaN(req.params[key])) {
          errors.push(`Tham số ${key} phải là số`);
        }
      }
    }
  }

  // ========== RETURN VALIDATION RESULTS ==========
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors,
      warnings,
    });
  }

  // Add warnings to request for logging
  if (warnings.length > 0) {
    req.validationWarnings = warnings;
  }

  return next();
};
