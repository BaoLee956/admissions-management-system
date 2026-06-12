import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/auth.api";
import useAuthStore from "../../store/useAuthStore";

const InternalLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await authApi.internalLogin({
        email: form.email,
        password: form.password,
      });

      if (res.success && res.token) {
        // Save to Zustand auth store
        login({ ...res.user, role: res.role }, res.token);
        
        alert("Đăng nhập thành công!");

        if (res.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (res.role === "OFFICER") {
          navigate("/officer-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setErrorMsg("Đăng nhập thất bại. Vui lòng thử lại!");
        alert("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.error?.message || "Sai tài khoản hoặc mật khẩu!";
      setErrorMsg(message);
      alert(message);
    } finally {
      setLoading(false);
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
              text-3xl
              font-bold
              text-gray-800
              tracking-wide
            "
          >
            LOGIN
          </h1>

          <p
            className="
              text-sm
              text-gray-400
              mt-2
            "
          >
            Sign in to your account
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
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
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
                Password
              </label>

              <button
                type="button"
                className="
                  text-xs
                  text-gray-400
                  hover:text-gray-600
                "
              >
                Forgot password?
              </button>

            </div>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
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

          {/* Remember */}
          <div
            className="
              flex items-center gap-2
              text-sm text-gray-500
            "
          >

            <input type="checkbox" />

            <span>Remember me</span>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              bg-[#2d2d2d]
              hover:bg-black
              text-white
              py-3
              rounded-md
              transition
            "
          >
            Login
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

          <p className="font-semibold mb-2">
            Demo Accounts
          </p>

          <p><strong>Admin:</strong> admin@ptit.edu.vn / 123456</p>
          <p className="mt-1"><strong>Officer:</strong> officer@ptit.edu.vn / 123456</p>

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
          Need access? Contact IT Support
        </p>

      </div>
    </div>
  );
};

export default InternalLogin;