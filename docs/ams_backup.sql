-- =====================================================================
-- DỰ ÁN ADMISSIONS MANAGEMENT SYSTEM (AMS)
-- FILE SAO LƯU CƠ SỞ DỮ LIỆU MẪU ĐỂ PHỤC VỤ DEMO TÍNH SẴN SÀNG (NFR-03)
-- CSDL: PostgreSQL
-- =====================================================================

-- 1. DỌN DẸP DỮ LIỆU CŨ (Nếu có)
DROP TABLE IF EXISTS "YeuCauPheDuyet" CASCADE;
DROP TABLE IF EXISTS "GiayToDinhKem" CASCADE;
DROP TABLE IF EXISTS "SinhVien" CASCADE;
DROP TABLE IF EXISTS "NguyenVong" CASCADE;
DROP TABLE IF EXISTS "HoSoNhapHoc" CASCADE;
DROP TABLE IF EXISTS "ChiTieuTuyenSinh" CASCADE;
DROP TABLE IF EXISTS "CauHinhXetTuyen" CASCADE;
DROP TABLE IF EXISTS "ChiTietDiem" CASCADE;
DROP TABLE IF EXISTS "CauTrucToHop" CASCADE;
DROP TABLE IF EXISTS "NhanVien" CASCADE;
DROP TABLE IF EXISTS "Nganh" CASCADE;
DROP TABLE IF EXISTS "ThiSinh" CASCADE;
DROP TABLE IF EXISTS "NhomQuyen" CASCADE;
DROP TABLE IF EXISTS "LoaiGiayTo" CASCADE;
DROP TABLE IF EXISTS "MonHoc" CASCADE;
DROP TABLE IF EXISTS "ToHopMon" CASCADE;
DROP TABLE IF EXISTS "DotTuyenSinh" CASCADE;
DROP TABLE IF EXISTS "Khoa" CASCADE;

-- 2. TẠO CẤU TRÚC BẢNG (DDL)

CREATE TABLE "Khoa" (
    "maKhoa" SERIAL PRIMARY KEY,
    "tenKhoa" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "DotTuyenSinh" (
    "maDot" SERIAL PRIMARY KEY,
    "nam" INTEGER NOT NULL,
    "tenDot" VARCHAR(255) NOT NULL,
    "thoiGianBatDau" TIMESTAMP WITH TIME ZONE NOT NULL,
    "thoiGianKetThuc" TIMESTAMP WITH TIME ZONE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "ToHopMon" (
    "maToHop" SERIAL PRIMARY KEY,
    "tenToHop" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "MonHoc" (
    "maMon" SERIAL PRIMARY KEY,
    "tenMon" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "LoaiGiayTo" (
    "maLoai" SERIAL PRIMARY KEY,
    "tenLoai" VARCHAR(255) NOT NULL,
    "batBuoc" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "NhomQuyen" (
    "maNhom" SERIAL PRIMARY KEY,
    "tenNhom" VARCHAR(255) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "ThiSinh" (
    "sbd" SERIAL PRIMARY KEY,
    "cccd" VARCHAR(255) UNIQUE NOT NULL,
    "hoTen" VARCHAR(255) NOT NULL,
    "ngaySinh" TIMESTAMP WITH TIME ZONE NOT NULL,
    "gioiTinh" BOOLEAN NOT NULL,
    "sdt" VARCHAR(255) UNIQUE NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "diaChi" VARCHAR(255) NOT NULL,
    "khuVuc" VARCHAR(255) NOT NULL,
    "doiTuongUuTien" VARCHAR(255) NOT NULL,
    "otp_code" VARCHAR(255) NOT NULL,
    "otp_expires" TIMESTAMP WITH TIME ZONE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Nganh" (
    "maNganh" SERIAL PRIMARY KEY,
    "tenNganh" VARCHAR(255) NOT NULL,
    "maKhoa" INTEGER NOT NULL REFERENCES "Khoa"("maKhoa") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "NhanVien" (
    "maNhanVien" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "hoTen" VARCHAR(255) NOT NULL,
    "matKhau" VARCHAR(255) NOT NULL,
    "trangThai" BOOLEAN DEFAULT TRUE,
    "maNhom" INTEGER NOT NULL REFERENCES "NhomQuyen"("maNhom") ON DELETE RESTRICT ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "HoSoNhapHoc" (
    "maHoSo" SERIAL PRIMARY KEY,
    "sbd" INTEGER UNIQUE NOT NULL REFERENCES "ThiSinh"("sbd") ON DELETE RESTRICT ON UPDATE CASCADE,
    "nguoiDuyet" INTEGER REFERENCES "NhanVien"("maNhanVien") ON DELETE SET NULL ON UPDATE CASCADE,
    "trangThai" VARCHAR(255) DEFAULT 'PENDING',
    "ngayNop" TIMESTAMP WITH TIME ZONE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CHÈN DỮ LIỆU MẪU (DML - SEED DATA)

-- Chèn Khoa
INSERT INTO "Khoa" ("tenKhoa") VALUES 
('Công nghệ thông tin'),
('Điện tử viễn thông'),
('Kinh tế & Quản trị doanh nghiệp');

-- Chèn Ngành học
INSERT INTO "Nganh" ("tenNganh", "maKhoa") VALUES 
('Kỹ thuật phần mềm', 1),
('An toàn thông tin', 1),
('Công nghệ thông tin', 1),
('Quản trị kinh doanh', 3);

-- Chèn Đợt tuyển sinh
INSERT INTO "DotTuyenSinh" ("nam", "tenDot", "thoiGianBatDau", "thoiGianKetThuc") VALUES 
(2026, 'Đợt tuyển sinh Đại học chính quy 2026', '2026-06-01 00:00:00+07', '2026-08-31 23:59:59+07');

-- Chèn Nhóm quyền
INSERT INTO "NhomQuyen" ("tenNhom") VALUES 
('ADMIN'),
('OFFICER'),
('CANDIDATE');

-- Chèn Tài khoản nhân viên (Mật khẩu mặc định: '123456' đã được mã hóa SHA-256)
INSERT INTO "NhanVien" ("email", "hoTen", "matKhau", "trangThai", "maNhom") VALUES 
('admin@ams.edu.vn', 'Nguyễn Văn Admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', true, 1),
('officer1@ams.edu.vn', 'Trần Thị Cán Bộ', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', true, 2);

-- Chèn Thí sinh mẫu
INSERT INTO "ThiSinh" ("cccd", "hoTen", "ngaySinh", "gioiTinh", "sdt", "email", "diaChi", "khuVuc", "doiTuongUuTien", "otp_code", "otp_expires") VALUES 
('001204001234', 'Nguyễn Hữu Đạt', '2008-05-15 00:00:00+07', true, '0987654321', 'datnh@gmail.com', '123 Đường Láng, Đống Đa, Hà Nội', 'KV1', 'ĐT1', '123456', '2026-12-31 23:59:59+07'),
('001204005678', 'Lê Thị Thu Hà', '2008-10-20 00:00:00+07', false, '0912345678', 'halt@gmail.com', '456 Lê Lợi, Ngô Quyền, Hải Phòng', 'KV2', 'DT', '654321', '2026-12-31 23:59:59+07');

-- Chèn Hồ sơ nhập học mẫu
INSERT INTO "HoSoNhapHoc" ("sbd", "nguoiDuyet", "trangThai", "ngayNop") VALUES 
(1, 2, 'PENDING', '2026-06-10 10:30:00+07'),
(2, 2, 'APPROVED', '2026-06-11 14:20:00+07');
