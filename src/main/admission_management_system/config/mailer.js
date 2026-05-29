const nodemailer = require('nodemailer');
require('dotenv').config();

// Khởi tạo đối tượng transporter với cấu hình SMTP của Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Sử dụng port 465 cho kết nối bảo mật SSL
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Kiểm tra trạng thái kết nối ngay khi file được gọi
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Lỗi cấu hình Email SMTP:', error.message);
    } else {
        console.log('✅ Dịch vụ Email SMTP đã sẵn sàng để gửi OTP');
    }
});

module.exports = transporter;