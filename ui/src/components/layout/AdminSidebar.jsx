import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
    },
    {
      name: "Quản lý Danh mục",
      path: "/category-management",
    },
    {
      name: "Import Dữ liệu",
      path: "/import-data",
    },
    {
      name: "Phê duyệt Yêu cầu",
      path: "/approval-requests",
    },
    {
      name: "Quản lý Người dùng",
      path: "/user-management",
    },
    {
      name: "Báo cáo dữ liệu",
      path: "/report-export",
    },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (

    <div
      className="
        w-[250px]
        bg-[#111827]
        text-white
        flex flex-col justify-between
        border-r border-gray-800
      "
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div
          className="
            p-6
            border-b border-gray-800
          "
        >

          <div className="flex items-center gap-3">

            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10"
            />

            <div>

              <h1 className="font-bold text-2xl">
                EduAdmin
              </h1>

              <p className="text-sm text-gray-400">
                Tuyển sinh 2025
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="p-4 space-y-2">

          {menus.map((menu, index) => (

            <button
              key={index}
              onClick={() => navigate(menu.path)}
              className={`
                w-full
                flex items-center
                px-4 py-3
                rounded-xl
                transition
                text-left
                text-sm
                ${
                  location.pathname === menu.path
                    ? "bg-[#1f2937]"
                    : "hover:bg-[#1f2937]"
                }
              `}
            >

              <span>
                {menu.name}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* USER */}
      <div
        className="
          p-5
          border-t border-gray-800
        "
      >

        <div className="flex items-center gap-3 mb-4">

          {/* AVATAR */}
          <div
            className="
              w-12 h-12
              rounded-full
              bg-white
              text-[#111827]
              flex items-center justify-center
              font-bold
              text-lg
            "
          >
            {(user?.hoTen || user?.name || "A")[0].toUpperCase()}
          </div>

          {/* INFO */}
          <div>

            <p className="font-semibold">
              {user?.hoTen || user?.name || "Nguyễn Văn A"}
            </p>

            <p className="text-sm text-gray-400">
              {user?.email || "admin@ptit.edu.vn"}
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

export default AdminSidebar;