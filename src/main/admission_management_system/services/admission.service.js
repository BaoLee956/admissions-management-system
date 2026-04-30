'use strict';

const {
  ChiTietDiem,
  CauTrucToHop,
  ChiTieuTuyenSinh,
} = require('../models');

// ================================
// LẤY DANH SÁCH MÔN TRONG TỔ HỢP
// ================================
const getSubjectsByToHop = async (maToHop) => {
  const cauTruc = await CauTrucToHop.findAll({
    where: { maToHop },
  });

  if (!cauTruc || cauTruc.length === 0) {
    throw new Error('Tổ hợp môn không tồn tại');
  }

  return cauTruc.map(item => item.maMon);
};

// ================================
// LẤY ĐIỂM THEO SBD + MÔN
// ================================
const getScores = async (sbd, maMons) => {
  const dsDiem = await ChiTietDiem.findAll({
    where: {
      sbd,
      maMon: maMons,
    },
  });

  if (!dsDiem || dsDiem.length === 0) {
    throw new Error('Không có dữ liệu điểm');
  }

  return dsDiem;
};

// ================================
// TÍNH TỔNG ĐIỂM
// ================================
const calculateTotal = (dsDiem) => {
  const total = dsDiem.reduce((sum, d) => sum + Number(d.diemSo), 0);
  return Number(total.toFixed(2));
};

// ================================
// XÉT TUYỂN
// ================================
const evaluateAdmission = async ({ sbd, maToHop }) => {
  if (!sbd) throw new Error('Thiếu SBD');
  if (!maToHop) throw new Error('Thiếu mã tổ hợp');

  // 1. Lấy môn trong tổ hợp
  const maMons = await getSubjectsByToHop(maToHop);

  // 2. Lấy điểm
  const dsDiem = await getScores(sbd, maMons);

  // 3. Tính tổng
  const diemTong = calculateTotal(dsDiem);

  // 4. Lấy điểm chuẩn (1 trường)
  const tieuChi = await ChiTieuTuyenSinh.findOne();

  if (!tieuChi) {
    throw new Error('Chưa có điểm chuẩn');
  }

  const diemChuan = Number(tieuChi.diemChuan);

  // 5. So sánh
  const passed = diemTong >= diemChuan;

  return {
    diemTong,
    diemChuan,
    trangThai: passed ? 'Đậu' : 'Rớt',
  };
};

module.exports = {
  evaluateAdmission,
};