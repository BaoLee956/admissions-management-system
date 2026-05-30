import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const StaffLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiClient.post("/admin/login", {
        email: form.email,
        password: form.password,
      });

      if (response.data && response.data.token) {
        alert("Đăng nhập thành công!");
        
        const token = response.data.token;
        const role = response.data.role;
        const { maNhom } = response.data.user;

        // Lưu thông tin token và role vào localStorage
        localStorage.setItem("staffToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("maNhom", String(maNhom));

        // Phân luồng điều hướng dựa trên maNhom
        if (maNhom === 8) {
          navigate("/admin/dashboard");
        } else if (maNhom === 9) {
          navigate("/admission-process");
        } else {
          alert("Tài khoản không có quyền truy cập hệ thống!");
        }
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#f3f4f6]
        flex items-center justify-center
        px-4
      "
    >
      {/* Card */}
      <div
        className="
          w-full max-w-sm
          bg-white
          border border-gray-200
          rounded-lg
          shadow-sm
          px-8 py-10
        "
      >
        {/* Logo */}
        <div className="text-center">
          <img
            src="/logo.png"
            alt="PTIT"
            className="w-14 mx-auto mb-4"
          />

          <h1
            className="
              text-2xl
              font-bold
              text-gray-800
              tracking-wide
            "
          >
            ĐĂNG NHẬP HỆ THỐNG
          </h1>

          <p
            className="
              text-sm
              text-gray-400
              mt-2
            "
          >
            Cổng thông tin dành cho Cán bộ & Admin
          </p>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label
              className="
                block
                text-sm
                text-gray-600
                mb-2
              "
            >
              Email nhân viên
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@ptit.edu.vn"
              required
              className="
                w-full
                border border-gray-300
                rounded-md
                px-4 py-3
                text-sm
                outline-none
                focus:border-black
              "
            />
          </div>

          {/* Password */}
          <div>
            <div
              className="
                flex justify-between
                items-center mb-2
              "
            >
              <label
                className="
                  text-sm
                  text-gray-600
                "
              >
                Mật khẩu
              </label>
            </div>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="
                w-full
                border border-gray-300
                rounded-md
                px-4 py-3
                text-sm
                outline-none
                focus:border-black
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full
              text-white
              py-3
              rounded-md
              transition
              font-bold
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#2d2d2d] hover:bg-black"}
            `}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Demo */}
        <div
          className="
            mt-6
            bg-gray-100
            rounded-md
            p-4
            text-sm
            text-gray-600
          "
        >
          <p className="font-semibold mb-1">
            Tài khoản dùng thử
          </p>
          <p>Email: admin@ptit.edu.vn (Admin)</p>
          <p>Mật khẩu: 123456</p>
        </div>

        {/* Footer */}
        <p
          className="
            text-center
            text-xs
            text-gray-400
            mt-8
          "
        >
          Học viện Công nghệ Bưu chính Viễn thông
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;
