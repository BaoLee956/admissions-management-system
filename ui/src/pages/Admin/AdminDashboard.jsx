const AdminDashboard = () => {
  const stats = [
    { title: "Tổng thí sinh hệ thống", value: "148 thí sinh", color: "from-blue-500 to-indigo-600", icon: "👥" },
    { title: "Hồ sơ nhập học trực tuyến", value: "32 hồ sơ", color: "from-emerald-500 to-teal-600", icon: "📄" },
    { title: "Ngành đào tạo tuyển sinh", value: "4 ngành học", color: "from-rose-500 to-red-600", icon: "🎓" }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide">Chào mừng Quản trị viên!</h2>
          <p className="text-sm text-red-100 max-w-xl">
            Chào mừng bạn quay trở lại với Hệ thống tuyển sinh Học viện Công nghệ Bưu chính Viễn thông. Bạn có thể sử dụng các thanh công cụ điều hướng bên trái để quản lý và vận hành quy trình.
          </p>
        </div>
        <div className="absolute right-8 bottom-0 text-9xl opacity-10 select-none hidden md:block">
          🏛️
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.title}</span>
              <h4 className="text-2xl font-extrabold text-slate-800">{stat.value}</h4>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-xl shadow-sm`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Info Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          🔔 Thông tin nhanh hệ thống
        </h3>
        <div className="border-t border-slate-100 pt-4">
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✔</span>
              <span>Kết nối Cơ sở dữ liệu PostgreSQL hoạt động bình thường.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✔</span>
              <span>Cơ chế gửi OTP candidates qua Email sẵn sàng hoạt động.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✔</span>
              <span>Thư mục upload tài liệu (`/uploads`) được phân quyền ghi thành công.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
