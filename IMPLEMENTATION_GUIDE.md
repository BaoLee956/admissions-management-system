# Hướng Dẫn Triển Khai - Xử Lý Trạng Thái & Middlewares

## 📋 Tổng Quan
Tài liệu này mô tả các tính năng được triển khai cho hệ thống quản lý tuyển sinh:
1. **API Officer Controller** - Xử lý danh sách hồ sơ chờ duyệt và cập nhật trạng thái
2. **Validator Middleware** - Kiểm tra và xác thực dữ liệu trước khi vào database
3. **Officer Routes** - Định tuyến cho các API mới

---

## 🔧 1. Officer Controller (`officer.controller.js`)

### 1.1 Lấy Danh Sách Hồ Sơ Chờ Duyệt
**Endpoint:** `GET /api/officer/profiles/pending`

**Chức năng:**
- Truy xuất tất cả hồ sơ có trạng thái `PENDING` (Chờ duyệt)
- Bao gồm thông tin thí sinh và danh sách giấy tờ đính kèm
- Sắp xếp theo ngày nộp (cũ nhất trước)

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách hồ sơ chờ duyệt thành công",
  "count": 5,
  "data": [
    {
      "maHoSo": 1,
      "sbd": 100001,
      "trangThai": "PENDING",
      "ngayNop": "2026-05-10T10:30:00Z",
      "ThiSinh": {
        "sbd": 100001,
        "hoTen": "Nguyễn Văn A",
        "email": "a@example.com",
        "sdt": "0987654321"
      },
      "GiayToDinhKems": [
        {
          "id": 1,
          "maLoai": 1,
          "duongDanFile": "/uploads/cccd_001.pdf",
          "ghiChuLoi": null
        }
      ]
    }
  ]
}
```

**Response khi không có dữ liệu:**
```json
{
  "success": true,
  "message": "Không có hồ sơ chờ duyệt",
  "data": []
}
```

---

### 1.2 Cập Nhật Trạng Thái Hồ Sơ/File
**Endpoint:** `PUT /api/officer/profiles/:maHoSo/status`

**Chức năng:**
- Cập nhật trạng thái hồ sơ thành: `APPROVED`, `VALID`, `REJECTED`, hoặc `REQUEST_SUPPLEMENT`
- Ghi lưu lý do từ chối hoặc yêu cầu bổ sung
- Tự động tạo yêu cầu trong bảng `YeuCauPheDuyet`

**Request Body:**
```json
{
  "status": "REQUEST_SUPPLEMENT",
  "reason": "Giấy tờ không rõ, vui lòng bổ sung lại"
}
```

**Trạng Thái Hợp Lệ:**
- `APPROVED` - Phê duyệt
- `VALID` - Hợp lệ
- `REJECTED` - Từ chối
- `REQUEST_SUPPLEMENT` - Yêu cầu bổ sung

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công (REQUEST_SUPPLEMENT)",
  "data": {
    "maHoSo": 1,
    "trangThai": "REQUEST_SUPPLEMENT",
    "lyDo": "Giấy tờ không rõ, vui lòng bổ sung lại"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Vui lòng cung cấp lý do từ chối/yêu cầu bổ sung"
}
```

---

### 1.3 Lấy Danh Sách Yêu Cầu Chờ Xử Lý
**Endpoint:** `GET /api/officer/requests/pending`

**Chức năng:**
- Truy xuất tất cả yêu cầu phê duyệt/bổ sung có trạng thái `PENDING`
- Bao gồm thông tin hồ sơ và thí sinh
- Sắp xếp theo thời gian tạo (cũ nhất trước)

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách yêu cầu thành công",
  "count": 3,
  "data": [
    {
      "id": 1,
      "maHoSo": 1,
      "maNhanVien": 5,
      "loaiYeuCau": "BÔ_SUNG",
      "liDoYeuCau": "Cần bổ sung bằng cấp",
      "trangThai": "PENDING",
      "HoSoNhapHoc": {
        "maHoSo": 1,
        "ngayNop": "2026-05-10T10:30:00Z",
        "ThiSinh": {
          "sbd": 100001,
          "hoTen": "Nguyễn Văn A",
          "email": "a@example.com"
        }
      }
    }
  ]
}
```

---

### 1.4 Xử Lý Yêu Cầu Phê Duyệt
**Endpoint:** `PUT /api/officer/requests/:id/handle`

**Chức năng:**
- Phê duyệt hoặc từ chối yêu cầu xử lý hồ sơ
- Cập nhật trạng thái hồ sơ nếu được phê duyệt
- Lưu lý do từ chối nếu cần

**Request Body:**
```json
{
  "action": "APPROVED"
}
```
hoặc
```json
{
  "action": "REJECTED",
  "reason": "Lý do từ chối"
}
```

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Xử lý yêu cầu thành công (APPROVED)",
  "data": {
    "id": 1,
    "maHoSo": 1,
    "trangThai": "APPROVED",
    "liDoTuChoi": null
  }
}
```

---

## 🛡️ 2. Validator Middleware (`validator.middleware.js`)

### 2.1 Chức Năng Chính

Middleware này được áp dụng cho tất cả các API request (trừ GET, DELETE trên URL parameters) để:

✅ **Kiểm tra dữ liệu không trống** - Ngăn chặn request body rỗng  
✅ **Xác thực định dạng email** - Kiểm tra email hợp lệ  
✅ **Xác thực số điện thoại** - Định dạng Việt Nam (0xxxxxxxxx hoặc +84xxxxxxxxx)  
✅ **Xác thực CCCD** - 9-12 chữ số  
✅ **Kiểm tra kiểu dữ liệu** - Đảm bảo số đúng định dạng  
✅ **Sanitize input** - Loại bỏ khoảng trắng dư thừa & ký tự nguy hiểm  
✅ **Phát hiện Script Injection** - Chặn `<script>`, `javascript:`  
✅ **Cảnh báo SQL Injection** - Phát hiện các pattern nguy hiểm (DROP, DELETE, INSERT, --, ;)  

### 2.2 Regex Patterns

```javascript
Email:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
Phone:  /^(\+84|0)[0-9]{9,10}$/
CCCD:   /^\d{9,12}$/
URL:    /^https?:\/\/.+/
```

### 2.3 Dữ Liệu Được Xác Thực

#### Profile/Admission Data:
- `sbd` - Số báo danh (bắt buộc, số)
- `hoTen` - Họ tên (bắt buộc, string)
- `ngaySinh` - Ngày sinh (bắt buộc, định dạng YYYY-MM-DD)
- `gioiTinh` - Giới tính (bắt buộc, boolean)
- `email` - Email (bắt buộc, định dạng hợp lệ)
- `sdt` - Số điện thoại (bắt buộc, định dạng Việt Nam)
- `cccd` - CCCD (bắt buộc, 9-12 chữ số)
- `diaChi` - Địa chỉ (bắt buộc)

#### File/Document Data:
- `maHoSo` - Mã hồ sơ (bắt buộc, số)
- `maLoai` - Mã loại giấy tờ (bắt buộc, số)
- `duongDanFile` - Đường dẫn file (bắt buộc, URL hoặc path)

### 2.4 Error Response

**Status: 400**
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    "Email không được để trống",
    "Định dạng email không hợp lệ",
    "Số điện thoại không hợp lệ (định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx)"
  ],
  "warnings": [
    "Dữ liệu có thể chứa SQL injection pattern"
  ]
}
```

### 2.5 Các Loại Kiểm Tra

| Loại | Mô Tả | Ví Dụ |
|------|-------|-------|
| **Empty Check** | Kiểm tra null, undefined, empty string | `null`, `""`, `[]` |
| **Type Validation** | Kiểm tra kiểu dữ liệu | `sbd` phải là số |
| **Format Validation** | Kiểm tra định dạng | Email, phone, CCCD |
| **Sanitization** | Loại bỏ ký tự nguy hiểm | `<script>` → bị chặn |
| **Injection Detection** | Phát hiện tấn công | SQL, XSS patterns |
| **Range Validation** | Kiểm tra phạm vi hợp lệ | Ngày sinh không trong tương lai |

---

## 📡 3. Officer Routes (`officer.routes.js`)

### 3.1 Định Tuyến API

```javascript
GET    /api/officer/                      // Health check
GET    /api/officer/profiles/pending      // Lấy hồ sơ chờ duyệt
PUT    /api/officer/profiles/:maHoSo/status     // Cập nhật trạng thái
GET    /api/officer/requests/pending      // Lấy yêu cầu chờ xử lý
PUT    /api/officer/requests/:id/handle   // Xử lý yêu cầu
```

### 3.2 Validation Middleware

- Các endpoint `PUT` được bảo vệ bằng `validatorMiddleware`
- Đảm bảo dữ liệu hợp lệ trước khi xử lý

---

## 🏗️ 4. Kiến Trúc Dữ Liệu

### 4.1 Mối Quan Hệ Models

```
HoSoNhapHoc (Admission Profile)
  ├── ThiSinh (Candidate)
  ├── GiayToDinhKem[] (Attached Documents)
  └── YeuCauPheDuyet[] (Approval Requests)

YeuCauPheDuyet (Approval Request)
  ├── HoSoNhapHoc (references)
  └── NhanVien (Officer)
```

### 4.2 Trạng Thái Hồ Sơ

| Trạng Thái | Mô Tả |
|-----------|-------|
| `PENDING` | Chờ duyệt |
| `APPROVED` | Được phê duyệt |
| `VALID` | Hợp lệ |
| `REJECTED` | Bị từ chối |
| `REQUEST_SUPPLEMENT` | Yêu cầu bổ sung |

### 4.3 Loại Yêu Cầu

| Loại | Mô Tả |
|------|-------|
| `BÔ_SUNG` | Yêu cầu bổ sung tài liệu |
| `TỪ_CHỐI` | Từ chối hồ sơ |

---

## 🧪 5. Ví Dụ Sử Dụng

### 5.1 Lấy Danh Sách Hồ Sơ Chờ Duyệt

```bash
curl -X GET http://localhost:3000/api/officer/profiles/pending
```

### 5.2 Yêu Cầu Bổ Sung

```bash
curl -X PUT http://localhost:3000/api/officer/profiles/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "REQUEST_SUPPLEMENT",
    "reason": "CCCD không rõ chữ, vui lòng bổ sung lại"
  }'
```

### 5.3 Phê Duyệt Hồ Sơ

```bash
curl -X PUT http://localhost:3000/api/officer/profiles/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPROVED",
    "reason": ""
  }'
```

### 5.4 Xử Lý Yêu Cầu

```bash
curl -X PUT http://localhost:3000/api/officer/requests/1/handle \
  -H "Content-Type: application/json" \
  -d '{
    "action": "APPROVED"
  }'
```

### 5.5 Test Validation Middleware

```bash
# Test - Empty email
curl -X POST http://localhost:3000/api/officer/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "sbd": 100001,
    "hoTen": "Nguyễn Văn A",
    "email": ""
  }'

# Response:
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    "Email không được để trống"
  ]
}
```

---

## 🔐 6. Security Features

### 6.1 Input Sanitization
```javascript
// Trước: "<script>alert('xss')</script>email@test.com"
// Sau:  "alert('xss')email@test.com"
```

### 6.2 Injection Detection
```javascript
// SQL Injection Detection
"' OR 1=1; DROP TABLE users;"  ❌ Cảnh báo
"' UNION SELECT * FROM admin" ❌ Cảnh báo

// Script Injection Detection
"<img src=x onerror='alert(1)'>" ❌ Chặn
"javascript:void(0)"            ❌ Chặn
```

### 6.3 Type Safety
```javascript
sbd: "abc"     ❌ Error: SBD phải là số
maHoSo: 1      ✅ OK
```

---

## 📝 7. Ghi Chú Quan Trọng

1. **Middleware được áp dụng globally** - Tất cả API POST/PUT/PATCH đều được validate
2. **Warnings được ghi lại** - Không chặn request nhưng ghi vào `req.validationWarnings`
3. **Database connection** - Đảm bảo models được load chính xác trong `models/index.js`
4. **Error handling** - Tất cả lỗi database được catch và return HTTP 500

---

## 🚀 8. Triển Khai

### 8.1 Cài Đặt Dependencies
```bash
npm install express sequelize cors
```

### 8.2 Khởi Động Server
```bash
npm start
```

### 8.3 Test API
```bash
npm run test
# hoặc sử dụng Postman/Thunder Client
```

---

## 📚 9. Tham Khảo Tệp

| Tệp | Vị Trí | Chức Năng |
|-----|--------|----------|
| `officer.controller.js` | `/controllers/` | API business logic |
| `validator.middleware.js` | `/middlewares/` | Data validation |
| `officer.routes.js` | `/routes/` | API routing |
| `app.js` | `/` | Express setup |
| `models/HoSoNhapHoc.js` | `/models/` | Profile model |
| `models/YeuCauPheDuyet.js` | `/models/` | Request model |

---

**Tài liệu này được tạo vào ngày 17/05/2026**
