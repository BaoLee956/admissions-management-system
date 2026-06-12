'use strict';

// Import model GiayToDinhKem (Bạn hãy đảm bảo tên model trong thư mục models/ chính xác)
const { GiayToDinhKem } = require('../models');

module.exports = {
  async uploadService() {
    return null;
  },

  // Hàm nghiệp vụ lưu DB
  async saveFileRecord({ fileUrl, fileName, thiSinhId }) {
    try {
      // Tạo một bản ghi mới lưu đường dẫn Cloudinary vào database
      const newRecord = await GiayToDinhKem.create({
        tenGiayTo: fileName,     
        duongDan: fileUrl,       // Lưu link Cloudinary
        thiSinhId: thiSinhId     // ID của thí sinh sở hữu file
      });

      return newRecord;
    } catch (error) {
      console.error('Lỗi service khi lưu Database:', error);
      throw error; 
    }
  },
};