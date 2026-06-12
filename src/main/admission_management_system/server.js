'use strict';

const path = require('path');
// 1. Nạp biến môi trường
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = require('./app');
// 2. Import module cấu hình database (Sequelize) từ thư mục models
const db = require('./models'); 

const PORT = Number(process.env.PORT || 4000);


// 3. Thực hiện kết nối tới Database trước
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Kết nối Cơ sở dữ liệu (PostgreSQL) thành công!');
    
    // 4. Đồng bộ các file Model trong code thành các bảng thực tế trong Database
    // { alter: true } giúp cập nhật cấu trúc bảng nếu bạn có thêm/bớt cột trong Model
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Đồng bộ cấu trúc bảng dữ liệu thành công!');
    
    // 5. Khởi động server Express sau khi DB đã sẵn sàng hoàn toàn

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // Nếu có lỗi sai mật khẩu, sai tên DB, server sẽ báo lỗi và tự động dừng lại
    console.error('❌ Lỗi nghiêm trọng khi khởi động kết nối Database:');
    console.error(error.message);
    process.exit(1); 
  });