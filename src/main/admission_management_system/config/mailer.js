const nodemailer = require('nodemailer');
const path = require('path');

// Đảm bảo biến môi trường được load từ .env
// (app.js đã load dotenv, nhưng chúng ta vẫn kiểm tra lại)
if (!process.env.MAIL_USER || !process.env.MAIL_APP_PASSWORD) {
    require('dotenv').config({ 
        path: path.join(__dirname, '../.env'),
        override: true 
    });
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Cho phép self-signed certificates
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Lỗi cấu hình Email SMTP:', error);
        console.error('📧 MAIL_USER:', process.env.MAIL_USER || '(không được set)');
        console.error('🔑 MAIL_APP_PASSWORD:', process.env.MAIL_APP_PASSWORD ? '(được set)' : '(không được set)');
    } else {
        console.log('✅ Dịch vụ Email SMTP đã sẵn sàng để gửi OTP');
        console.log('📧 Người gửi:', process.env.MAIL_USER);
    }
});

module.exports = transporter;