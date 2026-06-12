import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

const Reports = () => {
  const [reportType, setReportType] = useState(
    "Danh sách thí sinh trúng tuyển"
  );

  const [major, setMajor] = useState("Tất cả ngành");

  const [fromDate, setFromDate] = useState("2025-01-01");

  const [toDate, setToDate] = useState("2025-05-31");

  const [data] = useState([
    {
      id: "HS-2025-0041",
      name: "Nguyễn Thị Lan Anh",
      major: "Công nghệ thông tin",
      status: "Đã duyệt",
      date: "15/01/2025",
    },
    {
      id: "HS-2025-0042",
      name: "Trần Văn Minh",
      major: "Kinh tế học",
      status: "Chờ duyệt",
      date: "17/01/2025",
    },
    {
      id: "HS-2025-0043",
      name: "Lê Thu Hương",
      major: "Y học",
      status: "Đã duyệt",
      date: "19/01/2025",
    },
    {
      id: "HS-2025-0044",
      name: "Phạm Đức Hùng",
      major: "Luật học",
      status: "Từ chối",
      date: "22/01/2025",
    },
    {
      id: "HS-2025-0045",
      name: "Vũ Ngọc Bảo Châu",
      major: "Công nghệ thông tin",
      status: "Bổ sung hồ sơ",
      date: "25/01/2025",
    },
    {
      id: "HS-2025-0046",
      name: "Hoàng Anh Tuấn",
      major: "Kinh tế học",
      status: "Đã duyệt",
      date: "28/01/2025",
    },
  ]);

  const generateReport = () => {
    alert("Đã tạo báo cáo thành công!");
  };

  const exportExcel = () => {
    alert("Xuất Excel thành công!");
  };

  const exportPDF = () => {
    alert("Xuất PDF thành công!");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đã duyệt":
        return "bg-green-100 text-green-700";

      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-700";

      case "Từ chối":
        return "bg-red-100 text-red-700";

      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">

      <AdminSidebar />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold">
            Xuất báo cáo thống kê
          </h1>

          <p className="text-gray-500 mt-1">
            Tạo và xuất các báo cáo thống kê hồ sơ
          </p>

        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl p-6 mb-6">

          <h3 className="font-semibold mb-4">
            Bộ lọc báo cáo
          </h3>

          <div className="grid grid-cols-5 gap-4">

            <select
              value={reportType}
              onChange={(e) =>
                setReportType(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option>
                Danh sách thí sinh trúng tuyển
              </option>

              <option>
                Báo cáo tiến độ nộp hồ sơ
              </option>

              <option>
                Thống kê hồ sơ lỗi
              </option>
            </select>

            <select
              value={major}
              onChange={(e) =>
                setMajor(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option>Tất cả ngành</option>
              <option>Công nghệ thông tin</option>
              <option>Kinh tế học</option>
              <option>Y học</option>
              <option>Luật học</option>
            </select>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

            <button
              onClick={generateReport}
              className="
                bg-[#1e3a8a]
                text-white
                rounded-xl
                px-4
                py-3
                hover:bg-[#1d4ed8]
              "
            >
              Tạo báo cáo
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-5 mb-6">

          <div className="bg-white p-5 rounded-2xl">
            <p className="text-gray-500">
              Tổng hồ sơ
            </p>

            <h2 className="text-3xl font-bold mt-2">
              248
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <p className="text-gray-500">
              Đã duyệt
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              184
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <p className="text-gray-500">
              Chờ duyệt
            </p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              47
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl">
            <p className="text-gray-500">
              Từ chối
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              17
            </h2>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm">

          <div className="flex justify-between items-center p-5 border-b">

            <h2 className="font-bold text-lg">
              Xem trước dữ liệu
            </h2>

            <div className="flex gap-3">

              <button
                onClick={exportExcel}
                className="
                  bg-green-600
                  text-white
                  px-4 py-2
                  rounded-xl
                "
              >
                Xuất Excel
              </button>

              <button
                onClick={exportPDF}
                className="
                  bg-red-600
                  text-white
                  px-4 py-2
                  rounded-xl
                "
              >
                Xuất PDF
              </button>

            </div>

          </div>

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm text-gray-500">

                <th className="px-5 py-4">STT</th>
                <th className="px-5 py-4">MÃ HỒ SƠ</th>
                <th className="px-5 py-4">HỌ TÊN</th>
                <th className="px-5 py-4">NGÀNH</th>
                <th className="px-5 py-4">TRẠNG THÁI</th>
                <th className="px-5 py-4">NGÀY NỘP</th>

              </tr>

            </thead>

            <tbody>

              {data.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    {(index + 1)
                      .toString()
                      .padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4 text-blue-600 font-medium">
                    {item.id}
                  </td>

                  <td className="px-5 py-4">
                    {item.name}
                  </td>

                  <td className="px-5 py-4">
                    {item.major}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${getStatusClass(item.status)}
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    {item.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="p-5 border-t text-sm text-gray-500">
            Hiển thị 1–6 trong tổng số 248 hồ sơ
          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;