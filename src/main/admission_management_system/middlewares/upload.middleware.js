'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Thư mục lưu file uploads tại root của backend
const uploadDir = path.join(__dirname, '..', 'uploads');

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Bộ lọc định dạng file: Chỉ cho phép jpeg, jpg, png, pdf
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png) hoặc PDF.'), false);
  }
};

// Khởi tạo multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
});

const uploadFields = upload.fields([
  { name: 'cccd', maxCount: 1 },
  { name: 'hocBa', maxCount: 1 },
  { name: 'giayTotNghiep', maxCount: 1 },
  { name: 'minhChungUuTien', maxCount: 1 },
]);

module.exports = uploadFields;
