import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPortal = () => {
  const [form, setForm] = useState({
    sbd: "",
    cccd: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // TODO: gọi API
    navigate("/otp");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      
      {/* Logo + Title */}
      <div className="text-center mb-6">
        <img src="/logo.png" alt="PTIT" className="w-16 mx-auto mb-2" />

        <h1 className="text-lg font-semibold">
          HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
        </h1>
        <p className="text-sm text-gray-500">
          Hệ thống tra cứu tuyển sinh
        </p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-1">
          Xác thực thí sinh
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Nhập thông tin để nhận mã OTP xác thực
        </p>

        {/* SBD */}
        <div className="mb-4">
          <label className="text-sm font-medium">Số báo danh</label>
          <input
            type="text"
            name="sbd"
            placeholder="Nhập số báo danh..."
            value={form.sbd}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Số báo danh của thí sinh
          </p>
        </div>

        {/* CCCD */}
        <div className="mb-4">
          <label className="text-sm font-medium">Số CCCD</label>
          <input
            type="text"
            name="cccd"
            placeholder="Nhập số CCCD 12 chữ số..."
            value={form.cccd}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Căn cước công dân 12 số
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black transition"
        >
          Nhận mã OTP
        </button>

        {/* Note */}
        <p className="text-xs text-gray-400 mt-4">
          Mã OTP sẽ được gửi đến số điện thoại đã đăng ký. Nếu gặp vấn đề, vui
          lòng liên hệ ban tuyển sinh để được hỗ trợ.
        </p>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-6">
        © 2025 Trường Đại học. Bản quyền thuộc về nhà trường.
      </p>
    </div>
  );
};

export default SearchPortal;