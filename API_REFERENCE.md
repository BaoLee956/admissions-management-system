# API Quick Reference - Officer Endpoints

## 🔗 Base URL
```
http://localhost:3000/api/officer
```

---

## 📋 Endpoints

### 1️⃣ Health Check
```
GET /
```
**Response:**
```json
{ "ok": true }
```

---

### 2️⃣ Get Pending Profiles (Hồ Sơ Chờ Duyệt)
```
GET /profiles/pending
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách hồ sơ chờ duyệt thành công",
  "count": 2,
  "data": [
    {
      "maHoSo": 1,
      "sbd": 100001,
      "trangThai": "PENDING",
      "ngayNop": "2026-05-15T14:30:00Z",
      "ThiSinh": {
        "sbd": 100001,
        "hoTen": "Nguyễn Văn A",
        "email": "nguyenvana@example.com",
        "sdt": "0987654321"
      },
      "GiayToDinhKems": [
        {
          "id": 1,
          "maLoai": 1,
          "duongDanFile": "/uploads/cccd_100001.pdf",
          "ghiChuLoi": null
        },
        {
          "id": 2,
          "maLoai": 2,
          "duongDanFile": "/uploads/hocba_100001.pdf",
          "ghiChuLoi": null
        }
      ]
    }
  ]
}
```

---

### 3️⃣ Update Profile Status (Cập Nhật Trạng Thái)
```
PUT /profiles/:maHoSo/status
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "REQUEST_SUPPLEMENT",
  "reason": "CCCD không rõ chữ, vui lòng bổ sung"
}
```

**Valid Statuses:**
- `APPROVED` - Phê duyệt
- `VALID` - Hợp lệ  
- `REJECTED` - Từ chối
- `REQUEST_SUPPLEMENT` - Yêu cầu bổ sung

**Response (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công (REQUEST_SUPPLEMENT)",
  "data": {
    "maHoSo": 1,
    "trangThai": "REQUEST_SUPPLEMENT",
    "lyDo": "CCCD không rõ chữ, vui lòng bổ sung"
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

### 4️⃣ Get Pending Requests (Yêu Cầu Chờ Xử Lý)
```
GET /requests/pending
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách yêu cầu thành công",
  "count": 1,
  "data": [
    {
      "id": 1,
      "maHoSo": 1,
      "maNhanVien": 5,
      "loaiYeuCau": "BÔ_SUNG",
      "liDoYeuCau": "CCCD không rõ chữ, vui lòng bổ sung",
      "liDoTuChoi": null,
      "trangThai": "PENDING",
      "createdAt": "2026-05-17T10:00:00Z",
      "HoSoNhapHoc": {
        "maHoSo": 1,
        "ngayNop": "2026-05-15T14:30:00Z",
        "ThiSinh": {
          "sbd": 100001,
          "hoTen": "Nguyễn Văn A",
          "email": "nguyenvana@example.com"
        }
      }
    }
  ]
}
```

---

### 5️⃣ Handle Approval Request (Xử Lý Yêu Cầu)
```
PUT /requests/:id/handle
Content-Type: application/json
```

**Request Body (Phê Duyệt):**
```json
{
  "action": "APPROVED"
}
```

**Request Body (Từ Chối):**
```json
{
  "action": "REJECTED",
  "reason": "Lý do từ chối"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Xử lý yêu cầu thành công (APPROVED)",
  "data": {
    "id": 1,
    "maHoSo": 1,
    "maNhanVien": 5,
    "loaiYeuCau": "BÔ_SUNG",
    "liDoYeuCau": "CCCD không rõ chữ, vui lòng bổ sung",
    "liDoTuChoi": null,
    "trangThai": "APPROVED"
  }
}
```

---

## ✅ Validation Rules

### Profile Data
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `sbd` | Number | ✅ | Must be a number |
| `hoTen` | String | ✅ | Not empty |
| `ngaySinh` | Date | ✅ | Format: YYYY-MM-DD, not in future |
| `gioiTinh` | Boolean | ✅ | true or false |
| `email` | String | ✅ | Valid email format |
| `sdt` | String | ✅ | Vietnam format: 0xxxxxxxxx or +84xxxxxxxxx |
| `cccd` | String | ✅ | 9-12 digits only |
| `diaChi` | String | ✅ | Not empty |

### File Data
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `maHoSo` | Number | ✅ | Must be a number |
| `maLoai` | Number | ✅ | Must be a number |
| `duongDanFile` | String | ✅ | Valid URL or file path |

---

## 🛡️ Security Features

✅ **XSS Protection** - Strips HTML tags and script injection  
✅ **SQL Injection Detection** - Warns about suspicious patterns  
✅ **Input Sanitization** - Trims whitespace and dangerous characters  
✅ **Type Validation** - Ensures correct data types  
✅ **Format Validation** - Email, phone, CCCD format checks  

---

## 🧪 Example Usage

### Curl Examples

**Get Pending Profiles:**
```bash
curl -X GET http://localhost:3000/api/officer/profiles/pending \
  -H "Content-Type: application/json"
```

**Request Supplement:**
```bash
curl -X PUT http://localhost:3000/api/officer/profiles/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "REQUEST_SUPPLEMENT",
    "reason": "Giấy tờ không rõ ràng"
  }'
```

**Approve Profile:**
```bash
curl -X PUT http://localhost:3000/api/officer/profiles/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPROVED",
    "reason": ""
  }'
```

**Get Pending Requests:**
```bash
curl -X GET http://localhost:3000/api/officer/requests/pending
```

**Approve Request:**
```bash
curl -X PUT http://localhost:3000/api/officer/requests/1/handle \
  -H "Content-Type: application/json" \
  -d '{
    "action": "APPROVED"
  }'
```

---

## ⚠️ Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `400 - Dữ liệu không hợp lệ` | Invalid input data | Check validation rules above |
| `404 - Không tìm thấy hồ sơ` | Profile ID doesn't exist | Verify maHoSo is correct |
| `400 - Mã hồ sơ không hợp lệ` | Non-numeric maHoSo | Ensure maHoSo is a number |
| `400 - Trạng thái không hợp lệ` | Invalid status | Use one of: APPROVED, VALID, REJECTED, REQUEST_SUPPLEMENT |
| `400 - Vui lòng cung cấp lý do` | Missing reason for rejection | Include reason when using REJECTED or REQUEST_SUPPLEMENT |

---

## 📊 Data Flow

```
1. Officer reviews pending profiles
   GET /api/officer/profiles/pending
        ↓
2. Officer requests supplement or approves
   PUT /api/officer/profiles/:id/status
        ↓
3. System creates approval request if needed
   (Auto-created in YeuCauPheDuyet)
        ↓
4. Officer reviews pending requests
   GET /api/officer/requests/pending
        ↓
5. Officer handles (approves/rejects) requests
   PUT /api/officer/requests/:id/handle
        ↓
6. Profile status updated accordingly
   (APPROVED, REJECTED, etc.)
```

---

**Last Updated: 2026-05-17**
