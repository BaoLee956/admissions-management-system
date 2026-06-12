# KỊCH BẢN DEMO TRỰC TIẾP (LIVE DEMO SCRIPT)
## THAO TÁC XUẤT/NHẬP FILE .SQL CHỨNG MINH TÍNH SẴN SÀNG CỦA DỮ LIỆU (NFR-03)

Tài liệu này hướng dẫn chi tiết kịch bản trình diễn trực tiếp thao tác sao lưu (Backup) và phục hồi (Restore) dữ liệu thông qua định dạng file `.sql` đối với hệ thống Tuyển sinh **Admissions Management System (AMS)**. Mục tiêu là chứng minh hệ thống đáp ứng yêu cầu phi chức năng về **Tính sẵn sàng của dữ liệu (Data Availability - NFR-03)** khi xảy ra sự cố.

---

### 1. THÔNG TIN CHUNG & THAM SỐ CẤU HÌNH

*   **Mục tiêu**: Chứng minh hệ thống có khả năng nhanh chóng khôi phục dữ liệu nguyên vẹn sau khi gặp sự cố nghiêm trọng (mất dữ liệu, xóa nhầm, hỏng database) với thời gian khôi phục (Recovery Time) dưới 1 phút.
*   **Hệ quản trị cơ sở dữ liệu**: PostgreSQL (đang được cấu hình kết nối tới Supabase Cloud Database).
*   **Thông tin kết nối (lấy từ [src/main/admission_management_system/.env](file:///d:/CNTT/TTCS/admissions-management-system/src/main/admission_management_system/.env))**:
    *   **Host**: `db.tmaucppgnwspduvklsdn.supabase.co`
    *   **Port**: `5432`
    *   **Username**: `postgres`
    *   **Database Name**: `postgres`
*   **Công cụ chuẩn bị**:
    *   Cài đặt công cụ dòng lệnh của PostgreSQL (`pg_dump` và `psql`).
    *   Trình duyệt web để hiển thị giao diện UI hoặc công cụ API Client (như Postman/Bruno) để kiểm tra kết quả.

---

### 2. KỊCH BẢN CHI TIẾT (5 BƯỚC DEMO TRỰC TIẾP)

#### BƯỚC 1: XÁC MINH TRẠNG THÁI HỆ THỐNG ĐANG HOẠT ĐỘNG
*   **Hành động**:
    1.  Mở trình duyệt truy cập vào Trang Quản trị (Admin Dashboard) hoặc sử dụng Postman gửi request lấy danh sách ngành học hiện tại:
        ```http
        GET http://localhost:4000/api/admin/nganh
        ```
    2.  Show lên màn hình các bản ghi ngành học và đợt tuyển sinh đang hiển thị bình thường.
*   **Giải thích cho người xem**: *"Hệ thống hiện tại đang hoạt động bình thường, dữ liệu ngành học và đợt tuyển sinh đang sẵn sàng phục vụ người dùng."*

---

#### BƯỚC 2: THỰC HIỆN XUẤT FILE DỮ LIỆU (.SQL EXPORT)
*   **Hành động**:
    1.  Mở Terminal (Command Prompt hoặc PowerShell trên Windows).
    2.  Thiết lập mật khẩu tạm thời cho phiên làm việc để không cần nhập thủ công:
        *   **PowerShell**:
            ```powershell
            $env:PGPASSWORD="UqNlqVw3EaNP7Bl5"
            ```
        *   **CMD (Command Prompt)**:
            ```cmd
            set PGPASSWORD=UqNlqVw3EaNP7Bl5
            ```
    3.  Chạy lệnh `pg_dump` để xuất dữ liệu cấu trúc và nội dung ra file `ams_backup.sql`:
        ```bash
        pg_dump -h db.tmaucppgnwspduvklsdn.supabase.co -U postgres -p 5432 -d postgres -F p -f ams_backup.sql
        ```
    4.  Mở file `ams_backup.sql` vừa tạo ra và lướt qua một số câu lệnh DDL (`CREATE TABLE`) và DML (`INSERT INTO`) để chứng minh dữ liệu đã được xuất thành công.
*   **Giải thích cho người xem**: *"Chúng ta vừa thực hiện tạo bản sao lưu vật lý toàn bộ cơ sở dữ liệu của hệ thống AMS thành một file định dạng văn bản `.sql`. File này chứa đầy đủ thông tin để tái cấu trúc lại database ở bất cứ đâu."*

---

#### BƯỚC 3: GIẢ LẬP SỰ CỐ MẤT DỮ LIỆU NGHIÊM TRỌNG (DATA DISASTER SIMULATION)
*   **Hành động**:
    1.  Thực hiện xóa toàn bộ các bảng trong cơ sở dữ liệu để giả lập trường hợp database bị phá hoại hoặc lỗi ổ cứng. Có thể chạy đoạn script SQL sau thông qua Database Tool (như DBeaver/pgAdmin) hoặc chạy qua `psql`:
        ```sql
        DROP TABLE IF EXISTS "YeuCauPheDuyet", "GiayToDinhKem", "SinhVien", "NguyenVong", "HoSoNhapHoc", "ChiTieuTuyenSinh", "CauHinhXetTuyen", "ChiTietDiem", "CauTrucToHop", "NhanVien", "Nganh", "ThiSinh", "NhomQuyen", "LoaiGiayTo", "MonHoc", "ToHopMon", "DotTuyenSinh", "Khoa" CASCADE;
        ```
    2.  Quay lại giao diện UI của ứng dụng AMS hoặc thực hiện lại API request ở Bước 1:
        ```http
        GET http://localhost:4000/api/admin/nganh
        ```
    3.  **Kết quả hiển thị**: API trả về lỗi `500` hoặc dữ liệu trống rỗng (không tìm thấy quan hệ/bảng dữ liệu).
*   **Giải thích cho người xem**: *"Lúc này, toàn bộ dữ liệu nghiệp vụ của hệ thống đã biến mất. Hệ thống không thể phục vụ việc đăng ký tuyển sinh hay phê duyệt hồ sơ nữa. Đây là một sự cố nghiêm trọng đe dọa tính hoạt động của ứng dụng."*

---

#### BƯỚC 4: THỰC HIỆN NHẬP DỮ LIỆU (.SQL IMPORT / RECOVERY)
*   **Hành động**:
    1.  Trong Terminal, tiếp tục sử dụng biến môi trường `PGPASSWORD` đã set ở Bước 2.
    2.  Chạy lệnh khôi phục cơ sở dữ liệu bằng công cụ `psql` từ file `ams_backup.sql` đã xuất ở Bước 2:
        ```bash
        psql -h db.tmaucppgnwspduvklsdn.supabase.co -U postgres -p 5432 -d postgres -f ams_backup.sql
        ```
    3.  Người xem sẽ nhìn thấy các lệnh SQL được thực thi liên tục trên Terminal (`CREATE TABLE`, `ALTER TABLE`, `copy` hoặc `INSERT`,...).
    4.  Quá trình này chỉ diễn ra trong vòng vài giây.
*   **Giải thích cho người xem**: *"Hệ thống khôi phục dữ liệu (Restore) tự động đọc file SQL dự phòng và tái lập chính xác cấu trúc dữ liệu cũng như thông tin tại thời điểm sao lưu."*

---

#### BƯỚC 5: XÁC MINH SỰ PHỤC HỒI & TÍNH SẴN SÀNG CỦA DỮ LIỆU
*   **Hành động**:
    1.  Quay lại trang quản trị AMS hoặc gửi lại API request:
        ```http
        GET http://localhost:4000/api/admin/nganh
        ```
    2.  **Kết quả hiển thị**: Dữ liệu ngành học, đợt tuyển sinh và thông tin thí sinh đã quay trở lại đầy đủ, chính xác như trước sự cố mà không cần khởi động lại Server backend.
*   **Giải thích cho người xem**: *"Dữ liệu đã được khôi phục nguyên vẹn 100%. Hệ thống đã sẵn sàng hoạt động trở lại bình thường. Điều này chứng minh tính khả thi tuyệt đối của phương án sao lưu, sẵn sàng đáp ứng tiêu chuẩn NFR-03."*

---

### 3. CÁC ĐIỂM CẦN NHẤN MẠNH KHI THUYẾT TRÌNH (TALKING POINTS)

1.  **Thời gian gián đoạn tối thiểu (RTO - Recovery Time Objective)**: Quá trình khôi phục thực tế chỉ mất khoảng **5 đến 15 giây** tùy thuộc vào dung lượng CSDL hiện tại. Điều này chứng minh hệ thống đạt tính sẵn sàng cao, đáp ứng các tiêu chuẩn khắt khe về thời gian phục hồi dịch vụ.
2.  **Tính toàn vẹn dữ liệu (RPO - Recovery Point Objective)**: Toàn bộ quan hệ dữ liệu (Primary Key, Foreign Key, Constraints) được giữ nguyên vẹn nhờ cấu trúc lưu trữ chuẩn hóa của file `.sql`.
3.  **Khả năng tự động hóa**: Kịch bản này hoàn toàn có thể lập lịch tự động (Cron job) định kỳ mỗi ngày hoặc mỗi giờ và đẩy lên các dịch vụ lưu trữ đám mây như AWS S3 hoặc Google Cloud Storage để tối ưu hóa an toàn thông tin.
