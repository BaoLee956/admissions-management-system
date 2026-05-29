const nodemailer = require('nodemailer');
const path = require('path');

// Ép buộc nạp lại và GHI ĐÈ mọi biến môi trường bằng file .env của backend
require('dotenv').config({ 
    path: path.join(__dirname, '../.env'),
    override: true 
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Lỗi cấu hình Email SMTP:', error.message);
    } else {
        console.log('✅ Dịch vụ Email SMTP đã sẵn sàng để gửi OTP');
    }
});

module.exports = transporter;