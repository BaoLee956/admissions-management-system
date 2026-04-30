'use strict';

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

module.exports = {
  verifySBDAndCCCD,
};