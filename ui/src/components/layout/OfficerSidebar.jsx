import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const OfficerSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuthStore();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuClass = (path) => `
    w-full
    text-left
    px-4 py-3
    rounded-xl
    text-sm
    font-medium
    transition-all
    duration-200
    ${
      isActive(path)
        ? "bg-[#111827] text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }
  `;

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (

    <div
      className="
        w-[260px]
        bg-white
        border-r
        flex flex-col
        justify-between
      "
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="h-[80px] px-6 border-b flex items-center">

          <div className="flex items-center gap-3">

            <img
              src="/logo.png"
              alt="PTIT"
              className="w-10 h-10 object-contain"
            />

            <div>

              <h1 className="font-bold text-[18px]">
                EduAdmin
              </h1>

              <p className="text-xs text-gray-400">
                Tuyển sinh 2025
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="p-4 space-y-2">

          <button
            onClick={() => navigate("/officer-dashboard")}
            className={menuClass("/officer-dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admission-process")}
            className={menuClass("/admission-process")}
          >
            Hồ sơ thí sinh
          </button>

          <button
            onClick={() => navigate("/review")}
            className={menuClass("/review")}
          >
            Xét duyệt
          </button>

          <button
            onClick={() => navigate("/student-reception")}
            className={menuClass("/student-reception")}
          >
            Quản lý tài liệu
          </button>

          <button
            onClick={() => navigate("/physical-docs")}
            className={menuClass("/physical-docs")}
          >
            Tiếp nhận
          </button>

        </div>

      </div>

      {/* USER */}
      <div className="border-t p-5">

        <div className="flex items-center gap-3 mb-4">

          {/* AVATAR */}
          <div
            className="
              w-12 h-12
              rounded-full
              bg-[#111827]
              text-white
              flex items-center justify-center
              font-bold
              text-lg
            "
          >
            A
          </div>

          {/* INFO */}
          <div>

            <p className="font-semibold text-sm">
              {user?.name || "Nguyễn Văn A"}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {user?.email || "officer@edu.vn"}
            </p>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            w-full
            bg-red-500
            text-white
            py-3
            rounded-xl
            text-sm
            font-medium
            hover:bg-red-600
            transition
          "
        >
          Đăng xuất
        </button>

      </div>

    </div>
  );
};

export default OfficerSidebar;