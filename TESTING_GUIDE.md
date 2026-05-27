# Testing Guide - Officer API Endpoints

## 🚀 Setup

### Prerequisites
- Node.js running with server started on `http://localhost:3000`
- Postman or Thunder Client installed
- Database seeded with test data

---

## ✨ Test Scenarios

### Test 1: Get Pending Profiles
**Objective:** Retrieve all profiles waiting for review

**Request:**
```
Method: GET
URL: http://localhost:3000/api/officer/profiles/pending
Headers: Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách hồ sơ chờ duyệt thành công",
  "count": 1,
  "data": [...]
}
```

**Test Cases:**
- ✅ Should return array of profiles with PENDING status
- ✅ Should include ThiSinh (candidate) information
- ✅ Should include GiayToDinhKem (documents) array
- ✅ Should be sorted by ngayNop (submission date)

---

### Test 2: Update Profile Status - Request Supplement
**Objective:** Request candidate to supplement documents

**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/profiles/1/status
Headers: Content-Type: application/json
Body:
{
  "status": "REQUEST_SUPPLEMENT",
  "reason": "CCCD không rõ chữ, vui lòng cung cấp lại bản clear"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công (REQUEST_SUPPLEMENT)",
  "data": {
    "maHoSo": 1,
    "trangThai": "REQUEST_SUPPLEMENT",
    "lyDo": "CCCD không rõ chữ, vui lòng cung cấp lại bản clear"
  }
}
```

**Verification:**
- ✅ Profile status should be REQUEST_SUPPLEMENT
- ✅ Should create entry in YeuCauPheDuyet table
- ✅ All files should have ghiChuLoi updated with reason

---

### Test 3: Update Profile Status - Reject
**Objective:** Reject a profile for invalid documents

**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/profiles/1/status
Headers: Content-Type: application/json
Body:
{
  "status": "REJECTED",
  "reason": "Học bạ bị làm mất, không thể tiếp tục xét tuyển"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công (REJECTED)",
  "data": {
    "maHoSo": 1,
    "trangThai": "REJECTED",
    "lyDo": "Học bạ bị làm mất, không thể tiếp tục xét tuyển"
  }
}
```

---

### Test 4: Update Profile Status - Approve
**Objective:** Approve a valid profile

**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/profiles/1/status
Headers: Content-Type: application/json
Body:
{
  "status": "APPROVED",
  "reason": ""
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công (APPROVED)",
  "data": {
    "maHoSo": 1,
    "trangThai": "APPROVED",
    "lyDo": null
  }
}
```

---

### Test 5: Get Pending Requests
**Objective:** Retrieve all pending approval requests

**Request:**
```
Method: GET
URL: http://localhost:3000/api/officer/requests/pending
Headers: Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Lấy danh sách yêu cầu thành công",
  "count": 1,
  "data": [
    {
      "id": 1,
      "maHoSo": 1,
      "loaiYeuCau": "BÔ_SUNG",
      "trangThai": "PENDING",
      "HoSoNhapHoc": {...}
    }
  ]
}
```

---

### Test 6: Handle Approval Request - Approve
**Objective:** Approve a pending request

**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/requests/1/handle
Headers: Content-Type: application/json
Body:
{
  "action": "APPROVED"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Xử lý yêu cầu thành công (APPROVED)",
  "data": {
    "id": 1,
    "trangThai": "APPROVED"
  }
}
```

**Verification:**
- ✅ Request status should be APPROVED
- ✅ Corresponding profile should be updated to APPROVED

---

### Test 7: Handle Approval Request - Reject
**Objective:** Reject a pending request

**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/requests/1/handle
Headers: Content-Type: application/json
Body:
{
  "action": "REJECTED",
  "reason": "Giáy tờ không đáp ứng yêu cầu"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Xử lý yêu cầu thành công (REJECTED)",
  "data": {
    "id": 1,
    "trangThai": "REJECTED",
    "liDoTuChoi": "Giáy tờ không đáp ứng yêu cầu"
  }
}
```

---

## 🛡️ Validation Error Tests

### Test V1: Empty Email
**Request:**
```
Method: POST
URL: http://localhost:3000/api/officer/profiles
Body:
{
  "sbd": 100001,
  "hoTen": "Nguyễn Văn A",
  "email": "",
  "sdt": "0987654321",
  "cccd": "123456789",
  "ngaySinh": "2000-01-01",
  "gioiTinh": true,
  "diaChi": "Hà Nội"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    "Email không được để trống"
  ]
}
```

---

### Test V2: Invalid Email Format
**Request:**
```
Body:
{
  "email": "invalid-email"
}
```

**Expected Response (400):**
```json
{
  "errors": [
    "Định dạng email không hợp lệ"
  ]
}
```

---

### Test V3: Invalid Phone Number
**Request:**
```
Body:
{
  "sdt": "123456"
}
```

**Expected Response (400):**
```json
{
  "errors": [
    "Số điện thoại không hợp lệ (định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx)"
  ]
}
```

---

### Test V4: Invalid CCCD
**Request:**
```
Body:
{
  "cccd": "abc"
}
```

**Expected Response (400):**
```json
{
  "errors": [
    "CCCD phải là 9-12 chữ số"
  ]
}
```

---

### Test V5: XSS Injection Attempt
**Request:**
```
Body:
{
  "hoTen": "<script>alert('xss')</script>"
}
```

**Expected Response (400):**
```json
{
  "errors": [
    "Dữ liệu chứa nội dung nguy hiểm (Script injection)"
  ]
}
```

---

### Test V6: SQL Injection Attempt
**Request:**
```
Body:
{
  "hoTen": "'; DROP TABLE HoSoNhapHoc; --"
}
```

**Expected Response (400):**
```json
{
  "warnings": [
    "Dữ liệu có thể chứa SQL injection pattern"
  ]
}
```

---

### Test V7: Missing Required Field
**Request:**
```
Body:
{
  "sbd": 100001,
  "email": "test@example.com"
  // Missing hoTen, ngaySinh, gioiTinh, sdt, cccd, diaChi
}
```

**Expected Response (400):**
```json
{
  "errors": [
    "Họ tên không được để trống",
    "Ngày sinh không được để trống",
    "Giới tính không được để trống",
    "Số điện thoại không được để trống",
    "CCCD không được để trống",
    "Địa chỉ không được để trống"
  ]
}
```

---

### Test V8: Invalid Date Format
**Request:**
```
Body:
{
  "ngaySinh": "32/13/2000"
}
```

**Expected Response (400):**
```json
{
  "errors": [
    "Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)"
  ]
}
```

---

### Test V9: Future Birth Date
**Request:**
```
Body:
{
  "ngaySinh": "2030-01-01"
}
```

**Expected Response (200):**
```json
{
  "warnings": [
    "Ngày sinh trong tương lai"
  ]
}
```
(Warning only, not blocking)

---

### Test V10: Invalid Status Update
**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/profiles/1/status
Body:
{
  "status": "INVALID_STATUS",
  "reason": "test"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Trạng thái không hợp lệ. Chấp nhận: APPROVED, VALID, REJECTED, REQUEST_SUPPLEMENT"
}
```

---

### Test V11: Missing Reason for Rejection
**Request:**
```
Method: PUT
URL: http://localhost:3000/api/officer/profiles/1/status
Body:
{
  "status": "REJECTED"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Vui lòng cung cấp lý do từ chối/yêu cầu bổ sung"
}
```

---

## 📊 Full Workflow Test

### Complete User Journey

1. **Step 1:** Get pending profiles
   ```
   GET /api/officer/profiles/pending
   ```

2. **Step 2:** Review profile and request supplement
   ```
   PUT /api/officer/profiles/1/status
   {
     "status": "REQUEST_SUPPLEMENT",
     "reason": "Giáy tờ không rõ"
   }
   ```

3. **Step 3:** Check pending requests
   ```
   GET /api/officer/requests/pending
   ```

4. **Step 4:** Candidate submits new documents...

5. **Step 5:** Officer reviews again
   ```
   GET /api/officer/profiles/pending
   ```

6. **Step 6:** Approve the profile
   ```
   PUT /api/officer/profiles/1/status
   {
     "status": "APPROVED",
     "reason": ""
   }
   ```

7. **Step 7:** Handle the request
   ```
   PUT /api/officer/requests/1/handle
   {
     "action": "APPROVED"
   }
   ```

---

## 📝 Notes

- All timestamps should be in ISO 8601 format
- Phone numbers must follow Vietnam format
- CCCD must be 9-12 digits
- Reason field is required for REJECTED and REQUEST_SUPPLEMENT statuses
- Invalid data will be sanitized (whitespace trimmed, dangerous characters removed)

---

**Test Guide Created: 2026-05-17**
