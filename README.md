# Hệ thống Quản lý Tuyển sinh Online - Nhóm 1

Một ứng dụng web phục vụ **tra cứu điểm chuẩn, quản lý hồ sơ và xét tuyển** cho thí sinh và cán bộ tuyển sinh. README này hướng dẫn nhanh cách thiết lập, chạy dự án và liệt kê các công nghệ chính — tối ưu cho lập trình viên tiếp quản hoặc triển khai.

**Features**
- **Xác thực thí sinh:** Xác thực theo SBD / CCCD và xác thực hai bước (OTP qua email).
- **Phân quyền & bảo mật:** JWT cho API, middleware kiểm soát quyền truy cập cho Admin / Officer / Candidate.
- **Quản lý hồ sơ & xét tuyển:** Tạo, chỉnh sửa, theo dõi trạng thái hồ sơ và yêu cầu phê duyệt.
- **Nhập / xuất dữ liệu:** Hỗ trợ import/ export Excel để xử lý danh sách lớn.
- **Upload tài liệu an toàn:** Lưu trữ file lên Cloud (ví dụ Cloudinary) với middleware upload.

**Tech Stack**
- **Frontend:** React.js, Vite, Zustand, TailwindCSS
- **Backend:** Node.js, Express.js, Nodemailer, Sequelize (ORM)
- **Database:** PostgreSQL (ví dụ), Sequelize migrations/seeders
- **Tools & Utilities:** Git, ESLint/Prettier (tùy chọn), Cloudinary, SMTP provider

**Setup & Run**

Chuẩn bị môi trường cục bộ theo các bước dưới đây (chi tiết và chính xác để dev mới có thể làm theo):

1. Clone repository

```bash
git clone <your-repo-url>
cd admissions-management-system
```

2. Backend — tạo file `.env`

Tạo file `.env` trong thư mục backend (ví dụ: `src/main/admission_management_system/`)

Mẫu `.env` (bắt buộc phải cập nhật các giá trị phù hợp với môi trường của bạn):

```bash
# Server
PORT=3000
NODE_ENV=development

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME=admissions_db

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# SMTP (gửi mail OTP, thông báo)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_FROM="No-Reply <no-reply@example.com>"

# Cloudinary (hoặc provider lưu file khác)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Các biến khác (tuỳ dự án)
APP_NAME=AdmissionManagementSystem
```

3. Cài đặt phụ thuộc — Backend

```bash
cd src/main/admission_management_system
npm install
```

4. Thiết lập Database
- Tạo database (`DB_NAME`) trên PostgreSQL.
- Chạy migrations và seeders nếu có (nếu dự án sử dụng Sequelize CLI):

```bash
# nếu dùng sequelize-cli
npx sequelize db:migrate
npx sequelize db:seed:all

# hoặc nếu repository có script tiện ích
npm run migrate
npm run seed
```

5. Chạy Backend (development)

```bash
# ví dụ script dev:be nếu đã định nghĩa
npm run dev:be

# hoặc
npm start
```

6. Frontend — cấu hình và chạy

```bash
cd ../../../ui
npm install
# tạo file .env cho frontend nếu cần (ví dụ: VITE_API_BASE_URL)
npm run dev
```

7. Kiểm tra nhanh
- Mở trình duyệt vào `http://localhost:3000` (hoặc `VITE` dev URL cho frontend) và kiểm tra các endpoint chính:
  - Đăng nhập / Đăng ký
  - API health: `/api/health` (nếu có)

Ghi chú quan trọng:
- Luôn bảo mật `JWT_SECRET`, `SMTP_PASS` và các khóa API — không commit `.env` vào git.
- Điều chỉnh cấu hình `DB_*` và `SMTP_*` theo môi trường (dev/staging/production).
