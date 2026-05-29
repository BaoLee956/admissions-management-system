import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountdown from "../../hooks/useCountdown";
import { authApi } from "../../services/auth.api";
import useAuthStore from "../../store/useAuthStore";

const OTPVerify = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState("");
  const inputsRef = useRef([]);
  
  // Đổi bộ đếm ngược thành 300 giây (5 phút) cho khớp với Backend mới
  const { time } = useCountdown(300); 
  const navigate = useNavigate();
  
  const login = useAuthStore((state) => state.login);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMsg(""); 

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    
    if (code.length < 6) {
      setErrorMsg("Vui lòng nhập đủ 6 số OTP");
      return;
    }

    try {
      // 1. Lấy SBD động từ localStorage đã được lưu ở trang SearchPortal
      const currentSbd = localStorage.getItem("temp_sbd");
      
      // Nếu vì lý do nào đó SBD bị mất, yêu cầu người dùng quay lại
      if (!currentSbd) {
        setErrorMsg("Không tìm thấy thông tin thí sinh. Vui lòng quay lại trang tra cứu.");
        return;
      }

      // 2. Gửi SBD thực tế và mã OTP lên Backend
      const data = { sbd: currentSbd, otpCode: code };
      
      const result = await authApi.verifyOTP(data);

      if (result.success && result.token) {
        // Xóa temp_sbd đi cho sạch sẽ sau khi đăng nhập thành công
        localStorage.removeItem("temp_sbd");
        login(result, result.token);
        navigate("/result");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
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
          Mã xác thực đã được gửi về email của bạn
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
          <p className="text-red-500 text-sm font-semibold mb-4 text-center">{errorMsg}</p>
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
          disabled={time === 0} 
          className={`w-full py-3 rounded-xl mb-3 font-semibold text-white transition-colors ${
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