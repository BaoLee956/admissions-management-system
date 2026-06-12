import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const stats = [
    {
      title: "Tổng thí sinh đã Import",
      value: "12,540",
      sub: "+12% so với tháng trước",
      color: "text-green-500",
      icon: "👥",
    },
    {
      title: "Yêu cầu chờ phê duyệt",
      value: "18",
      sub: "Cần xử lý",
      color: "text-yellow-500",
      icon: "📝",
    },
    {
      title: "Trạng thái hệ thống",
      value: "Ổn định",
      sub: "● Đang hoạt động",
      color: "text-green-500",
      icon: "🖥️",
    },
    {
      title: "Tài khoản nội bộ",
      value: "56",
      sub: "Đang hoạt động",
      color: "text-purple-500",
      icon: "👤",
    },
  ];

  const logs = [
    {
      title: "Phê duyệt yêu cầu #1024",
      user: "Admin",
      time: "Vừa xong",
    },
    {
      title: "Import 450 hồ sơ thí sinh",
      user: "Hệ thống",
      time: "10 phút trước",
    },
    {
      title: "Cập nhật quyền User",
      user: "Admin",
      time: "1 giờ trước",
    },
    {
      title: "Lỗi đồng bộ API Gateway",
      user: "Hệ thống",
      time: "3 giờ trước",
    },
    {
      title: "Đăng nhập thành công",
      user: "Admin",
      time: "Hôm qua",
    },
  ];

  const chartData = [120, 250, 180, 320, 450, 150, 90];

  return (

    <div className="flex min-h-screen bg-[#f3f4f8]">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div className="
          h-[72px]
          bg-white
          border-b
          px-6
          flex items-center justify-between
        ">

          {/* SEARCH */}
          <div className="
            w-[320px]
            bg-[#f5f6fa]
            rounded-xl
            px-4 py-2
          ">

            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
              "
            />

          </div>

          

        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-3xl font-bold">
                Tổng quan Hệ thống
              </h1>

              <p className="text-gray-500 mt-1">
                Cập nhật lần cuối: Hôm nay, 10:45 AM
              </p>

            </div>

            

          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-5 mb-6">

            {stats.map((item, index) => (

              <div
                key={index}
                className="
                  bg-white
                  rounded-2xl
                  p-5
                  shadow-sm
                "
              >

                <div className="
                  flex justify-between
                  items-start
                ">

                  <div>

                    <p className="text-gray-400 text-sm">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                      {item.value}
                    </h2>

                    <p className={`text-sm mt-2 ${item.color}`}>
                      {item.sub}
                    </p>

                  </div>

                  <div className="text-2xl">
                    {item.icon}
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* BODY */}
          <div className="grid grid-cols-12 gap-6">

            {/* CHART */}
            <div className="
              col-span-8
              bg-white
              rounded-2xl
              p-6
              shadow-sm
            ">

              <div className="
                flex justify-between
                items-center
                mb-8
              ">

                <div>

                  <h2 className="text-xl font-bold">
                    Số lượng hồ sơ nộp theo ngày
                  </h2>

                  <p className="text-sm text-gray-500">
                    7 ngày gần nhất
                  </p>

                </div>

                <button className="
                  border
                  px-4 py-2
                  rounded-lg
                  text-sm
                ">
                  Tuần này
                </button>

              </div>

              {/* CHART */}
              <div className="
                h-[320px]
                flex items-end
                justify-between
                gap-5
                px-6
              ">

                {chartData.map((value, index) => (

                  <div
                    key={index}
                    className="flex flex-col items-center gap-3"
                  >

                    <div
                      className="
                        w-[52px]
                        bg-blue-400
                        rounded-t-xl
                      "
                      style={{
                        height: `${value / 1.5}px`,
                      }}
                    />

                    <span className="text-sm text-gray-500">
                      {
                        ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][index]
                      }
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* LOG */}
            <div className="
              col-span-4
              bg-white
              rounded-2xl
              p-6
              shadow-sm
            ">

              <div className="
                flex justify-between
                items-center
                mb-6
              ">

                <h2 className="text-xl font-bold">
                  Nhật ký hệ thống
                </h2>

                <button>
                  ⋯
                </button>

              </div>

              <div className="space-y-5">

                {logs.map((item, index) => (

                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    <div className="
                      w-10 h-10
                      rounded-full
                      bg-gray-100
                      flex items-center justify-center
                    ">
                      🔹
                    </div>

                    <div>

                      <h3 className="font-medium text-sm">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.user}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.time}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              <button
                className="
                  mt-8
                  text-blue-600
                  text-sm
                  hover:underline
                "
              >
                Xem tất cả nhật ký
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;