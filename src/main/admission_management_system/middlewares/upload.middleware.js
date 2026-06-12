const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Cấu hình storage lưu trực tiếp lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'admissions-system/uploads', // Tên folder trên Cloudinary (bạn có thể đổi tùy ý)
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Các định dạng cho phép
    // transformation: [{ width: 1000, crop: "limit" }] // (Tùy chọn) Resize ảnh nếu cần để tiết kiệm dung lượng
  },
});

// Tạo middleware upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn file 5MB
  },
});

module.exports = upload;