import { Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (location.pathname === "/admin" || location.pathname === "/admin/") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Import Dữ liệu", path: "/admin/import", icon: "📥" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800 shrink-0">
        <div>
          {/* Logo Area */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <img
              src="/logo.png"
              alt="PTIT"
              className="w-10 h-10 drop-shadow-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h1 className="text-md font-bold tracking-wide text-white">
                PTIT Admin
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Tuyển sinh 2026
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition duration-200
                    ${isActive 
                      ? "bg-red-600 text-white shadow-md shadow-red-900/10" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"}
                  `}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="px-2">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tài khoản</p>
            <p className="text-sm font-bold text-slate-300 mt-1 truncate">Hội đồng tuyển sinh</p>
            <p className="text-xs text-slate-400 truncate">admin@ptit.edu.vn</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="
              w-full bg-slate-800 hover:bg-red-950 hover:text-red-200 hover:border-red-900/50 text-slate-300 
              font-semibold px-4 py-3 rounded-xl border border-slate-700/60
              transition duration-200 text-sm flex items-center justify-center gap-2
            "
          >
            🚪 Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-8 justify-between shrink-0 shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-slate-700">
              {location.pathname === "/admin/import" ? "Nhập dữ liệu thí sinh" : "Hệ thống tổng quan"}
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-semibold">
            Hệ thống: Học viện Công nghệ Bưu chính Viễn thông
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
