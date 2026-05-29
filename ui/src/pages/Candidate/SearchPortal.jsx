import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import file authApi mà chúng ta đã tạo ở các bước trước
import { authApi } from "../../services/auth.api"; 

const SearchPortal = () => {
  const [form, setForm] = useState({
    sbd: "",
    cccd: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.sbd.trim()) {
      setError("Vui lòng nhập số báo danh");
      return false;
    }
    if (!/^\d{8}$/.test(form.sbd.trim())) {
      setError("Số báo danh phải là 8 chữ số");
      return false;
    }
    if (!form.cccd.trim()) {
      setError("Vui lòng nhập số CCCD");
      return false;
    }
    if (!/^\d{12}$/.test(form.cccd.trim())) {
      setError("CCCD phải là 12 chữ số");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Gọi API thực tế xuống Backend (Cổng 4000)
      const data = {
        sbd: Number(form.sbd.trim()),
        cccd: form.cccd.trim(),
      };
      
      const response = await authApi.requestOTP(data);

      // Nếu API trả về thành công (200 OK)
      if (response.success) {
        // Lưu tạm SBD vào localStorage để màn hình OTPVerify biết của ai
        localStorage.setItem("temp_sbd", form.sbd.trim());
        navigate("/otp");
      }
    } catch (err) {
      // Hiển thị lỗi chính xác từ Backend (Sai SBD, sai CCCD...)
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error.message);
      } else {
        setError("Lỗi kết nối đến máy chủ, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      
      {/* Logo + Title */}
      <div className="text-center mb-6">
        <img src="/logo.png" alt="PTIT" className="w-16 mx-auto mb-2" />
        <h1 className="text-lg font-semibold">HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</h1>
        <p className="text-sm text-gray-500">Hệ thống tra cứu tuyển sinh</p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-1">Xác thực thí sinh</h2>
        <p className="text-sm text-gray-500 mb-4">Nhập thông tin để nhận mã OTP xác thực</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-medium">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm font-medium">Số báo danh</label>
          <input
            type="text"
            name="sbd"
            placeholder="Nhập 8 chữ số..."
            value={form.sbd}
            onChange={handleChange}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 tracking-wider"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Số CCCD</label>
          <input
            type="text"
            name="cccd"
            placeholder="Nhập 12 chữ số..."
            value={form.cccd}
            onChange={handleChange}
            disabled={loading}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 tracking-wider"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-800 text-white font-semibold py-3 rounded hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "Đang xử lý..." : "Nhận mã OTP"}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
          Mã OTP sẽ được gửi đến email đã đăng ký. Nếu gặp vấn đề, vui lòng liên hệ ban tuyển sinh để được hỗ trợ.
        </p>
      </div>
    </div>
  );
};

export default SearchPortal;