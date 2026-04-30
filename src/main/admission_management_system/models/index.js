'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

// Get sequelize instance from config
let sequelize;
try {
  const config = require('../config/database'); // or wherever your config is
  sequelize = new Sequelize(config);
} catch (error) {
  // If config doesn't exist yet, sequelize will be initialized elsewhere
  console.log('⚠️ Database config not found. Sequelize will be initialized elsewhere.');
}

// Load all model files
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Establish relationships between models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 🔥 Define all associations (hasMany, belongsTo, hasOne, belongsToMany)
// Theo yêu cầu: Khoa - Ngành - Quản lý - 1:M

// ========== 1. KHOA <-> NGANH (1:M - Quản lý) ==========
// Khoa.hasMany(Nganh) - Khoa quản lý nhiều Ngành
db.Khoa.hasMany(db.Nganh, {
  foreignKey: 'maKhoa',
  as: 'nganhs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// Nganh.belongsTo(Khoa)
db.Nganh.belongsTo(db.Khoa, {
  foreignKey: 'maKhoa',
  as: 'khoa',
});

// ========== 2. DOT TUYEN SINH <-> CHI TIEU TUYEN SINH (1:M - Mở/Tổ chức) ==========
// DotTuyenSinh.hasMany(ChiTieuTuyenSinh) - Đợt tuyển sinh mở/tổ chức nhiều chỉ tiêu
db.DotTuyenSinh.hasMany(db.ChiTieuTuyenSinh, {
  foreignKey: 'maDot',
  as: 'chiTieuTuyenSinhs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// ChiTieuTuyenSinh.belongsTo(DotTuyenSinh)
db.ChiTieuTuyenSinh.belongsTo(db.DotTuyenSinh, {
  foreignKey: 'maDot',
  as: 'dotTuyenSinh',
});

// ========== 3. NGANH <-> CHI TIEU TUYEN SINH (1:M - Có/Phân bổ) ==========
// Nganh.hasMany(ChiTieuTuyenSinh) - Ngành có/phân bổ nhiều chỉ tiêu
db.Nganh.hasMany(db.ChiTieuTuyenSinh, {
  foreignKey: 'maNganh',
  as: 'chiTieuTuyenSinhs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// ChiTieuTuyenSinh.belongsTo(Nganh)
db.ChiTieuTuyenSinh.belongsTo(db.Nganh, {
  foreignKey: 'maNganh',
  as: 'nganh',
});

// ========== 4. NGANH <-> CAU HINH XET TUYEN (1:M - Xét tuyển bằng) ==========
// Nganh.hasMany(CauHinhXetTuyen) - Ngành xét tuyển bằng nhiều cấu trúc
db.Nganh.hasMany(db.CauHinhXetTuyen, {
  foreignKey: 'maNganh',
  as: 'cauHinhXetTuyens',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// CauHinhXetTuyen.belongsTo(Nganh)
db.CauHinhXetTuyen.belongsTo(db.Nganh, {
  foreignKey: 'maNganh',
  as: 'nganh',
});

// ========== 5. CAU HINH XET TUYEN <-> TO HOP MON (M:1 - Sử dụng) ==========
// CauHinhXetTuyen.belongsTo(ToHopMon)
db.CauHinhXetTuyen.belongsTo(db.ToHopMon, {
  foreignKey: 'maToHop',
  as: 'toHopMon',
});
// ToHopMon.hasMany(CauHinhXetTuyen)
db.ToHopMon.hasMany(db.CauHinhXetTuyen, {
  foreignKey: 'maToHop',
  as: 'cauHinhXetTuyens',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

db.CauHinhXetTuyen.belongsTo(db.DotTuyenSinh, {
  foreignKey: 'maDot',
  as: 'dotTuyenSinh',
});
// maDot.hasMany(CauHinhXetTuyen)
db.DotTuyenSinh.hasMany(db.CauHinhXetTuyen, {
  foreignKey: 'maDot',
  as: 'cauHinhXetTuyens',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// ========== 6. TO HOP MON <-> CAU TRUC TO HOP (1:M - Bao gồm) ==========
// ToHopMon.hasMany(CauTrucToHop) - Tổ hợp môn bao gồm nhiều cấu trúc
db.ToHopMon.hasMany(db.CauTrucToHop, {
  foreignKey: 'maToHop',
  as: 'cauTrucToHops',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// CauTrucToHop.belongsTo(ToHopMon)
db.CauTrucToHop.belongsTo(db.ToHopMon, {
  foreignKey: 'maToHop',
  as: 'toHopMon',
});

// ========== 7. CAU TRUC TO HOP <-> MON HOC (M:1 - Thuộc về) ==========
// CauTrucToHop.belongsTo(MonHoc) - Cấu trúc tổ hợp thuộc về môn học
db.CauTrucToHop.belongsTo(db.MonHoc, {
  foreignKey: 'maMon',
  as: 'monHoc',
});
// MonHoc.hasMany(CauTrucToHop)
db.MonHoc.hasMany(db.CauTrucToHop, {
  foreignKey: 'maMon',
  as: 'cauTrucToHops',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// ========== 8. THI SINH <-> CHI TIET DIEM (1:M - Đạt được/Có) ==========
// ThiSinh.hasMany(ChiTietDiem) - Thí sinh đạt được/có nhiều chi tiết điểm
db.ThiSinh.hasMany(db.ChiTietDiem, {
  foreignKey: 'sbd',
  as: 'chiTietDiems',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// ChiTietDiem.belongsTo(ThiSinh)
db.ChiTietDiem.belongsTo(db.ThiSinh, {
  foreignKey: 'sbd',
  as: 'thiSinh',
});

// ========== 9. CHI TIET DIEM <-> MON HOC (M:1 - Của môn) ==========
// ChiTietDiem.belongsTo(MonHoc) - Chi tiết điểm của môn học
db.ChiTietDiem.belongsTo(db.MonHoc, {
  foreignKey: 'maMon',
  as: 'monHoc',
});
// MonHoc.hasMany(ChiTietDiem)
db.MonHoc.hasMany(db.ChiTietDiem, {
  foreignKey: 'maMon',
  as: 'chiTietDiems',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// ========== 10. THI SINH <-> NGUYEN VONG (1:M - Đăng ký) ==========
// ThiSinh.hasMany(NguyenVong) - Thí sinh đăng ký nhiều nguyện vọng
db.ThiSinh.hasMany(db.NguyenVong, {
  foreignKey: 'sbd',
  as: 'nguyenVongs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// NguyenVong.belongsTo(ThiSinh)
db.NguyenVong.belongsTo(db.ThiSinh, {
  foreignKey: 'sbd',
  as: 'thiSinh',
});

// ========== 11. NGUYEN VONG <-> TO HOP MON (M:1 - Đăng ký theo/Sử dụng) ==========
// NguyenVong.belongsTo(ToHopMon) - Nguyện vọng sử dụng tổ hợp môn
db.NguyenVong.belongsTo(db.ToHopMon, {
  foreignKey: 'maToHop',
  as: 'toHopMon',
});
// ToHopMon.hasMany(NguyenVong)
db.ToHopMon.hasMany(db.NguyenVong, {
  foreignKey: 'maToHop',
  as: 'nguyenVongs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// ========== 12. CHI TIEU TUYEN SINH <-> NGUYEN VONG (1:M - Chứa danh sách) ==========
// ChiTieuTuyenSinh.hasMany(NguyenVong) - Chỉ tiêu chứa danh sách nguyện vọng
// Note: Cần scope vì FK (maDot, maNganh) là composite
db.ChiTieuTuyenSinh.hasMany(db.NguyenVong, {
  foreignKey: 'maNganh',
  as: 'nguyenVongs',
  scope: { 'maDot': sequelize.where(sequelize.col('ChiTieuTuyenSinh.maDot'), sequelize.Op.eq, sequelize.col('NguyenVong.maDot')) },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// NguyenVong.belongsTo(ChiTieuTuyenSinh) - Thông qua composite key
db.NguyenVong.belongsTo(db.ChiTieuTuyenSinh, {
  foreignKey: ['maDot', 'maNganh'],
  as: 'chiTieuTuyenSinh',
});

// ========== 13. THI SINH <-> HO SO NHAP HOC (1:1 - Nộp) ==========
// ThiSinh.hasOne(HoSoNhapHoc) - Thí sinh nộp hồ sơ nhập học
db.ThiSinh.hasOne(db.HoSoNhapHoc, {
  foreignKey: 'sbd',
  as: 'hoSoNhapHoc',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// HoSoNhapHoc.belongsTo(ThiSinh)
db.HoSoNhapHoc.belongsTo(db.ThiSinh, {
  foreignKey: 'sbd',
  as: 'thiSinh',
});

// ========== 14. HO SO NHAP HOC <-> SINH VIEN (1:1 - Trở thành) ==========
// HoSoNhapHoc.hasOne(SinhVien) - Hồ sơ trở thành sinh viên
db.HoSoNhapHoc.hasOne(db.SinhVien, {
  foreignKey: 'maHoSo',
  as: 'sinhVien',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// SinhVien.belongsTo(HoSoNhapHoc)
db.SinhVien.belongsTo(db.HoSoNhapHoc, {
  foreignKey: 'maHoSo',
  as: 'hoSoNhapHoc',
});

// ========== 15. HO SO NHAP HOC <-> GIAY TO DINH KEM (1:M - Bao gồm/Có chứa) ==========
// HoSoNhapHoc.hasMany(GiayToDinhKem) - Hồ sơ bao gồm nhiều giấy tờ
db.HoSoNhapHoc.hasMany(db.GiayToDinhKem, {
  foreignKey: 'maHoSo',
  as: 'giayToDinhKems',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// GiayToDinhKem.belongsTo(HoSoNhapHoc)
db.GiayToDinhKem.belongsTo(db.HoSoNhapHoc, {
  foreignKey: 'maHoSo',
  as: 'hoSoNhapHoc',
});

// ========== 16. LOAI GIAY TO <-> GIAY TO DINH KEM (1:M - Phân loại) ==========
// LoaiGiayTo.hasMany(GiayToDinhKem) - Loại giấy phân loại nhiều giấy tờ
db.LoaiGiayTo.hasMany(db.GiayToDinhKem, {
  foreignKey: 'maLoai',
  as: 'giayToDinhKems',
  onUpdate: 'CASCADE',
  onDelete: 'RESTRICT',
});
// GiayToDinhKem.belongsTo(LoaiGiayTo)
db.GiayToDinhKem.belongsTo(db.LoaiGiayTo, {
  foreignKey: 'maLoai',
  as: 'loaiGiayTo',
});

// ========== 17. NHAN VIEN <-> HO SO NHAP HOC (1:M - Xét duyệt) ==========
// Thông qua bảng YeuCauPheDuyet
// NhanVien.hasMany(HoSoNhapHoc, through YeuCauPheDuyet)
db.NhanVien.hasMany(db.YeuCauPheDuyet, {
  foreignKey: 'maNhanVien',
  as: 'yeuCauPheDuyets',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL',
});
// Truy cập gián tiếp: nhân viên xét duyệt hồ sơ
db.NhanVien.belongsToMany(db.HoSoNhapHoc, {
  through: db.YeuCauPheDuyet,
  foreignKey: 'maNhanVien',
  otherKey: 'maHoSo',
  as: 'hoSoNhapHocs',
});

// ========== 18. NHAN VIEN <-> YEU CAU PHE DUYET (1:M - Tạo bởi) ==========
// NhanVien.hasMany(YeuCauPheDuyet)
// Already defined above ↑

// ========== 19. HO SO NHAP HOC <-> YEU CAU PHE DUYET (1:M - Bị ảnh hưởng bởi) ==========
// HoSoNhapHoc.hasMany(YeuCauPheDuyet)
db.HoSoNhapHoc.hasMany(db.YeuCauPheDuyet, {
  foreignKey: 'maHoSo',
  as: 'yeuCauPheDuyets',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
// YeuCauPheDuyet.belongsTo(HoSoNhapHoc)
db.YeuCauPheDuyet.belongsTo(db.HoSoNhapHoc, {
  foreignKey: 'maHoSo',
  as: 'hoSoNhapHoc',
});

// ========== YEU CAU PHE DUYET <-> NHAN VIEN (M:1) ==========
// YeuCauPheDuyet.belongsTo(NhanVien)
db.YeuCauPheDuyet.belongsTo(db.NhanVien, {
  foreignKey: 'maNhanVien',
  as: 'nhanVien',
});

// ========== NGANH <-> NGUYEN VONG (M:1) ==========
// NguyenVong.belongsTo(Nganh)
db.NguyenVong.belongsTo(db.Nganh, {
  foreignKey: 'maNganh',
  as: 'nganh',
});
// Nganh.hasMany(NguyenVong)
db.Nganh.hasMany(db.NguyenVong, {
  foreignKey: 'maNganh',
  as: 'nguyenVongs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// ========== DOT TUYEN SINH <-> NGUYEN VONG (M:1) ==========
// NguyenVong.belongsTo(DotTuyenSinh)
db.NguyenVong.belongsTo(db.DotTuyenSinh, {
  foreignKey: 'maDot',
  as: 'dotTuyenSinh',
});
// DotTuyenSinh.hasMany(NguyenVong)
db.DotTuyenSinh.hasMany(db.NguyenVong, {
  foreignKey: 'maDot',
  as: 'nguyenVongs',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// ========== NHOM QUYEN <-> NHAN VIEN (1:M) ==========
// NhomQuyen.hasMany(NhanVien)
db.NhomQuyen.hasMany(db.NhanVien, {
  foreignKey: 'maNhom',
  as: 'nhanViens',
  onUpdate: 'CASCADE',
  onDelete: 'RESTRICT',
});
// NhanVien.belongsTo(NhomQuyen)
db.NhanVien.belongsTo(db.NhomQuyen, {
  foreignKey: 'maNhom',
  as: 'nhomQuyen',
});

// ========== DOT TUYEN SINH <-> CAU HINH XET TUYEN ==========
// CauHinhXetTuyen.belongsTo(DotTuyenSinh)
db.CauHinhXetTuyen.belongsTo(db.DotTuyenSinh, {
  foreignKey: 'maDot',
  as: 'dotTuyenSinh',
});
// DotTuyenSinh.hasMany(CauHinhXetTuyen)
db.DotTuyenSinh.hasMany(db.CauHinhXetTuyen, {
  foreignKey: 'maDot',
  as: 'cauHinhXetTuyens',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// Export models and sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
