import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdmissionProcess = () => {

  const navigate = useNavigate();

  const [batch, setBatch] = useState("Đợt 1 - 2025");
  const [major, setMajor] = useState("Công nghệ thông tin");
  const [benchmark, setBenchmark] = useState(24.5);

  const students = [
    {
      id: "HS2025-001",
      name: "Nguyễn Văn An",
      cccd: "001098123456",
      major: "Công nghệ thông tin",
      score: 26.5,
      status: "Trúng tuyển",
    },
    {
      id: "HS2025-042",
      name: "Trần Thị Bích",
      cccd: "079199654321",
      major: "Công nghệ thông tin",
      score: 25.0,
      status: "Trúng tuyển",
    },
    {
      id: "HS2025-088",
      name: "Lê Hoàng Nam",
      cccd: "001097888999",
      major: "Công nghệ thông tin",
      score: 24.5,
      status: "Chờ duyệt",
    },
    {
      id: "HS2025-102",
      name: "Phạm Văn Cường",
      cccd: "034098111222",
      major: "Công nghệ thông tin",
      score: 23.0,
      status: "Không trúng tuyển",
    },
    {
      id: "HS2025-115",
      name: "Đặng Minh Tâm",
      cccd: "079099333444",
      major: "Công nghệ thông tin",
      score: 21.5,
      status: "Không trúng tuyển",
    },
  ];

  const getStatusStyle = (status) => {

    switch (status) {

      case "Trúng tuyển":
        return "bg-green-100 text-green-700";

      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-700";

      case "Không trúng tuyển":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handlePublish = () => {
    alert("Đã công bố kết quả xét tuyển!");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* SIDEBAR */}
      <div
        className="
          w-[240px]
          bg-white
          border-r
          flex flex-col justify-between
        "
      >

        <div>

          {/* Logo */}
          <div className="p-6 border-b">

            <div className="flex items-center gap-3">

              <img
                src="/logo.png"
                alt="PTIT"
                className="w-10 h-10"
              />

              <div>

                <h1 className="text-xl font-bold">
                  EduAdmin
                </h1>

                <p className="text-sm text-gray-500">
                  Tuyển sinh 2025
                </p>

              </div>

            </div>

          </div>

          {/* Menu */}
          <div className="p-4 space-y-2">

            <button
              className="
                w-full text-left
                px-4 py-3
                rounded-xl
                hover:bg-gray-100
              "
            >
              Dashboard
            </button>

            <button
              className="
                w-full text-left
                px-4 py-3
                rounded-xl
                bg-[#111827]
                text-white
              "
            >
              Hồ sơ tuyển sinh
            </button>

            <button
              className="
                w-full text-left
                px-4 py-3
                rounded-xl
                hover:bg-gray-100
              "
            >
              Xét tuyển
            </button>

            <button
              className="
                w-full text-left
                px-4 py-3
                rounded-xl
                hover:bg-gray-100
              "
            >
              Tiếp nhận
            </button>

          </div>

        </div>

        {/* User */}
        <div className="p-4 border-t">

          <p className="font-medium">
            Nguyễn Văn A
          </p>

          <p className="text-sm text-gray-500">
            admin@edu.vn
          </p>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="mb-6">

          <p className="text-sm text-gray-400 mb-1">
            Hồ sơ tuyển sinh {">"} Thực hiện xét tuyển
          </p>

          <h1 className="text-3xl font-bold">
            Thực hiện Xét tuyển
          </h1>

        </div>

        {/* FILTER */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-5
            mb-6
            flex flex-wrap gap-4 items-end
          "
        >

          {/* Batch */}
          <div>

            <label
              className="
                block text-sm
                text-gray-500 mb-2
              "
            >
              ĐỢT TUYỂN SINH
            </label>

            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="
                border rounded-xl
                px-4 py-3
                min-w-[200px]
              "
            >
              <option>Đợt 1 - 2025</option>
              <option>Đợt 2 - 2025</option>
            </select>

          </div>

          {/* Major */}
          <div>

            <label
              className="
                block text-sm
                text-gray-500 mb-2
              "
            >
              NGÀNH HỌC
            </label>

            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="
                border rounded-xl
                px-4 py-3
                min-w-[220px]
              "
            >
              <option>Công nghệ thông tin</option>
              <option>An toàn thông tin</option>
              <option>Marketing</option>
              <option>Kế toán</option>
            </select>

          </div>

          {/* Benchmark */}
          <div>

            <label
              className="
                block text-sm
                text-gray-500 mb-2
              "
            >
              ĐIỂM CHUẨN
            </label>

            <input
              type="number"
              step="0.1"
              value={benchmark}
              onChange={(e) =>
                setBenchmark(e.target.value)
              }
              className="
                border rounded-xl
                px-4 py-3
                w-[140px]
              "
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-3 ml-auto">

            <button
              className="
                px-5 py-3
                border rounded-xl
                hover:bg-gray-100
              "
            >
              Lọc kết quả
            </button>

            <button
              className="
                px-5 py-3
                border rounded-xl
                hover:bg-gray-100
              "
            >
              Xuất Excel
            </button>

            <button
              onClick={handlePublish}
              className="
                px-5 py-3
                rounded-xl
                bg-blue-600
                text-white
                hover:bg-blue-700
              "
            >
              Công bố kết quả
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* Table Header */}
          <div
            className="
              flex justify-between items-center
              p-5 border-b
            "
          >

            <h2 className="text-xl font-bold">
              Danh sách Thí sinh Xét tuyển
            </h2>

            <div className="text-sm text-gray-500">
              Tổng: 124 hồ sơ
            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left text-gray-500 text-sm">

                  <th className="px-5 py-4">STT</th>
                  <th className="px-5 py-4">MÃ HỒ SƠ</th>
                  <th className="px-5 py-4">HỌ TÊN</th>
                  <th className="px-5 py-4">SỐ CCCD</th>
                  <th className="px-5 py-4">NGÀNH ĐĂNG KÝ</th>
                  <th className="px-5 py-4">ĐIỂM XÉT TUYỂN</th>
                  <th className="px-5 py-4">TRẠNG THÁI</th>
                  <th className="px-5 py-4">THAO TÁC</th>

                </tr>

              </thead>

              <tbody>

                {students.map((student, index) => (

                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {student.id}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {student.name}
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {student.cccd}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.major}
                    </td>

                    <td
                      className={`
                        px-5 py-4 font-bold
                        ${
                          student.score >= benchmark
                            ? "text-black"
                            : "text-red-500"
                        }
                      `}
                    >
                      {student.score}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`
                          px-3 py-1
                          rounded-full
                          text-sm font-medium
                          ${getStatusStyle(student.status)}
                        `}
                      >
                        {student.status}
                      </span>

                    </td>

                    {/* BUTTON */}
                    <td className="px-5 py-4">

                      <button
                        onClick={() => navigate("/review")}
                        className="
                          bg-[#111827]
                          text-white
                          px-4 py-2
                          rounded-lg
                          hover:bg-black
                          transition
                        "
                      >
                        Kiểm tra hồ sơ
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}
          <div
            className="
              flex justify-between items-center
              p-5 border-t
            "
          >

            <p className="text-sm text-gray-500">
              Hiển thị 1 đến 5 của 124 kết quả
            </p>

            <div className="flex gap-2">

              <button className="w-9 h-9 rounded-lg border">
                {"<"}
              </button>

              <button
                className="
                  w-9 h-9 rounded-lg
                  bg-blue-600 text-white
                "
              >
                1
              </button>

              <button className="w-9 h-9 rounded-lg border">
                2
              </button>

              <button className="w-9 h-9 rounded-lg border">
                3
              </button>

              <button className="w-9 h-9 rounded-lg border">
                {">"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdmissionProcess;