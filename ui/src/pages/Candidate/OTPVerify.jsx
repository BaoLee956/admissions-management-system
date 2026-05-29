import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountdown from "../../hooks/useCountdown";
import { authApi } from "../../services/auth.api";
import useAuthStore from "../../store/useAuthStore";

const OTPVerify = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState(""); // Thêm state để hiển thị lỗi
  const inputsRef = useRef([]);
  const { time } = useCountdown(60);
  const navigate = useNavigate();
  
  // Lấy hàm login từ thư viện Zustand
  const login = useAuthStore((state) => state.login);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMsg(""); // Xóa lỗi khi người dùng bắt đầu nhập lại

    // tự nhảy sang ô tiếp theo
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Đổi hàm này thành async để gọi API
  const handleSubmit = async () => {
    const code = otp.join("");
    
    // Validate cơ bản
    if (code.length < 6) {
      setErrorMsg("Vui lòng nhập đủ 6 số OTP");
      return;
    }

    try {
      // Tạm thời hardcode SBD để test. 
      // Sau này SBD sẽ được lấy từ localStorage hoặc React Router State từ trang SearchPortal truyền sang.
      const data = { sbd: "0100234", otpCode: code };
      
      // Gọi API xác thực
      const result = await authApi.verifyOTP(data);

      // Nếu thành công, lưu Token và chuyển hướng
      if (result.data && result.data.token) {
        login(result.data, result.data.token);
        navigate("/result"); // Chuyển sang trang kết quả
      }
    } catch (error) {
      // Bắt lỗi từ Backend trả về (Ví dụ: 401 Unauthorized do OTP sai/hết hạn)
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.error.message);
      } else {
        setErrorMsg("Có lỗi xảy ra khi kết nối đến máy chủ.");
      }
    }
  };

  const formatTime = () => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Xác thực OTP</h2>
        <p className="text-gray-500 mb-6 text-center">
          Mã xác thực đã được gửi về email <br />
          <span className="font-medium">ng***@gmail.com</span>
        </p>

        {/* OTP INPUT */}
        <div className="flex gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>

        {/* Khu vực hiển thị lỗi */}
        {errorMsg && (
          <p className="text-red-500 text-sm font-semibold mb-4">{errorMsg}</p>
        )}

        {/* Countdown */}
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          ⏱ Mã hết hạn sau
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-semibold">
            {formatTime()}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={time === 0} // Disable nút nếu hết giờ
          className={`w-full py-3 rounded-xl mb-3 font-semibold text-white ${
            time === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default OTPVerify;