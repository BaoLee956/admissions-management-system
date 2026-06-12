import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountdown from "../../hooks/useCountdown";

const OTPVerify = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const { time } = useCountdown(60);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

  const handleSubmit = () => {
    const code = otp.join("");
    console.log(code);
    navigate("/result");
  };

  const formatTime = () => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      {/* Back */}
      <button className="absolute top-6 left-6 text-2xl">
        ←
      </button>

      {/* Icon */}
      <div className="bg-gray-200 p-6 rounded-full mb-4">
        <span className="text-3xl">✉️</span>
      </div>

      <h2 className="text-xl font-semibold mb-2">Xác thực OTP</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Mã xác nhận đã được gửi về email <br />
        <span className="font-medium">ng***@gmail.com</span>
      </p>

      {/* OTP INPUT */}
      <div className="flex gap-3 mb-6">
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
        className="w-full max-w-md bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 mb-3"
      >
        Xác nhận
      </button>

      <button className="w-full max-w-md border py-3 rounded-xl text-gray-400">
        Gửi lại mã
      </button>

      <p className="text-sm text-gray-400 mt-4">
        Bạn cần hỗ trợ?{" "}
        <span className="text-blue-500 cursor-pointer">
          Liên hệ ngay
        </span>
      </p>
    </div>
  );
};

export default OTPVerify;