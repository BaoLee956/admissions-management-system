import { useNavigate } from "react-router-dom";
import OfficerSidebar from "../../components/layout/OfficerSidebar";

const OfficerDashboard = () => {

  const navigate = useNavigate();

  const stats = [
    {
      title: "Tổng hồ sơ",
      value: "1,248",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Hồ sơ chờ duyệt",
      value: "84",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Đã trúng tuyển",
      value: "756",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Tiếp nhận bản cứng",
      value: "512",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const recentActivities = [
    {
      name: "Nguyễn Văn An",
      action: "Đã duyệt hồ sơ",
      time: "5 phút trước",
    },
    {
      name: "Trần Minh Khoa",
      action: "Đã nộp hồ sơ online",
      time: "12 phút trước",
    },
    {
      name: "Lê Thu Hà",
      action: "Đã tiếp nhận bản cứng",
      time: "25 phút trước",
    },
  ];

  return (

    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <OfficerSidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Officer Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Hệ thống quản lý tuyển sinh PTIT
            </p>

          </div>

          <button
            onClick={() => navigate("/admission-process")}
            className="
              bg-[#111827]
              text-white
              px-5 py-3
              rounded-xl
              hover:bg-black
              transition
            "
          >
            Thực hiện xét tuyển
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-5 mb-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                shadow-sm
                p-5
              "
            >

              <div className="
                flex justify-between
                items-start
              ">

                <div>

                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>

                </div>

                <div className={`
                  px-3 py-1
                  rounded-full
                  text-sm font-medium
                  ${item.color}
                `}>
                  +12%
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-5">

          {/* LEFT */}
          <div className="col-span-8 space-y-5">

            {/* QUICK ACTION */}
            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
            ">

              <h2 className="text-xl font-bold mb-5">
                Chức năng nhanh
              </h2>

              <div className="grid grid-cols-3 gap-4">

                <button
                  onClick={() => navigate("/admission-process")}
                  className="
                    border rounded-2xl
                    p-5 text-left
                    hover:bg-gray-50
                    transition
                  "
                >

                  <h3 className="font-semibold mb-2">
                    Xét tuyển
                  </h3>

                  <p className="text-sm text-gray-500">
                    Thiết lập điểm chuẩn và duyệt danh sách
                  </p>

                </button>

                <button
                  onClick={() => navigate("/review")}
                  className="
                    border rounded-2xl
                    p-5 text-left
                    hover:bg-gray-50
                    transition
                  "
                >

                  <h3 className="font-semibold mb-2">
                    Duyệt hồ sơ
                  </h3>

                  <p className="text-sm text-gray-500">
                    Kiểm tra giấy tờ online
                  </p>

                </button>

                <button
                  onClick={() => navigate("/physical-docs")}
                  className="
                    border rounded-2xl
                    p-5 text-left
                    hover:bg-gray-50
                    transition
                  "
                >

                  <h3 className="font-semibold mb-2">
                    Tiếp nhận
                  </h3>

                  <p className="text-sm text-gray-500">
                    Quản lý hồ sơ bản cứng
                  </p>

                </button>

              </div>

            </div>

            {/* TABLE */}
            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
            ">

              <div className="
                flex justify-between
                items-center
                mb-5
              ">

                <h2 className="text-xl font-bold">
                  Hồ sơ gần đây
                </h2>

                <button
                  onClick={() => navigate("/review")}
                  className="
                    text-blue-600
                    hover:underline
                  "
                >
                  Xem tất cả
                </button>

              </div>

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr className="text-left text-sm text-gray-500">

                    <th className="px-4 py-3">
                      Mã HS
                    </th>

                    <th className="px-4 py-3">
                      Họ tên
                    </th>

                    <th className="px-4 py-3">
                      Ngành
                    </th>

                    <th className="px-4 py-3">
                      Trạng thái
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-t">

                    <td className="px-4 py-4">
                      HS2025-001
                    </td>

                    <td className="px-4 py-4">
                      Nguyễn Văn An
                    </td>

                    <td className="px-4 py-4">
                      CNTT
                    </td>

                    <td className="px-4 py-4">

                      <span className="
                        bg-green-100
                        text-green-700
                        px-3 py-1
                        rounded-full
                        text-sm
                      ">
                        Đã duyệt
                      </span>

                    </td>

                  </tr>

                  <tr className="border-t">

                    <td className="px-4 py-4">
                      HS2025-002
                    </td>

                    <td className="px-4 py-4">
                      Trần Minh Khoa
                    </td>

                    <td className="px-4 py-4">
                      ATTT
                    </td>

                    <td className="px-4 py-4">

                      <span className="
                        bg-yellow-100
                        text-yellow-700
                        px-3 py-1
                        rounded-full
                        text-sm
                      ">
                        Chờ duyệt
                      </span>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-4">

            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
            ">

              <h2 className="text-xl font-bold mb-5">
                Hoạt động gần đây
              </h2>

              <div className="space-y-5">

                {recentActivities.map((item, index) => (

                  <div
                    key={index}
                    className="border-b pb-4"
                  >

                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.action}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {item.time}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OfficerDashboard;