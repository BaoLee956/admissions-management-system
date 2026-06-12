import { useState } from "react";
import OfficerSidebar from "../../components/layout/OfficerSidebar";

const StudentReception = () => {

  const [students] = useState([
    {
      id: "HS-2024-001",
      name: "Trần Thị Lan Anh",
      email: "lan.anh@email.com",
      phone: "0912 345 678",
      major: "Công nghệ thông tin",
      date: "15/03/2024",
      status: "Chờ duyệt",
    },
    {
      id: "HS-2024-002",
      name: "Nguyễn Văn Minh",
      email: "van.minh@email.com",
      phone: "0987 654 321",
      major: "Quản trị kinh doanh",
      date: "12/03/2024",
      status: "Đã duyệt",
    },
    {
      id: "HS-2024-003",
      name: "Phạm Hồng Nhung",
      email: "hong.nhung@email.com",
      phone: "0903 111 222",
      major: "Y khoa",
      date: "10/03/2024",
      status: "Yêu cầu bổ sung",
    },
    {
      id: "HS-2024-004",
      name: "Lê Quốc Hùng",
      email: "quoc.hung@email.com",
      phone: "0976 888 444",
      major: "Kỹ thuật điện",
      date: "08/03/2024",
      status: "Đã duyệt",
    },
    {
      id: "HS-2024-005",
      name: "Vũ Thị Mai Linh",
      email: "mai.linh@email.com",
      phone: "0931 777 555",
      major: "Kinh tế học",
      date: "05/03/2024",
      status: "Chờ duyệt",
    },
    {
      id: "HS-2024-006",
      name: "Đỗ Trung Kiên",
      email: "trung.kien@email.com",
      phone: "0965 222 333",
      major: "Công nghệ thông tin",
      date: "02/03/2024",
      status: "Yêu cầu bổ sung",
    },
    {
      id: "HS-2024-007",
      name: "Bùi Thanh Tùng",
      email: "thanh.tung@email.com",
      phone: "0854 666 777",
      major: "Quản trị kinh doanh",
      date: "28/02/2024",
      status: "Đã duyệt",
    },
  ]);

  const getStatusStyle = (status) => {

    switch (status) {

      case "Đã duyệt":
        return "bg-green-100 text-green-700";

      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-700";

      case "Yêu cầu bổ sung":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (

    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <OfficerSidebar />

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div
          className="
            h-[72px]
            bg-white
            border-b
            px-6
            flex items-center justify-between
          "
        >

          <h1 className="text-2xl font-bold">
            Hồ sơ tuyển sinh
          </h1>

          <div className="flex items-center gap-4">

            <input
              type="text"
              placeholder="Tìm kiếm thí sinh, ngành học..."
              className="
                w-[320px]
                bg-gray-100
                rounded-xl
                px-4 py-2.5
                outline-none
                text-sm
              "
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">

            <div>

              <h2 className="text-3xl font-bold">
                Quản lý Hồ sơ thí sinh
              </h2>

              <p className="text-gray-500 mt-1">
                Danh sách toàn bộ hồ sơ đã nộp trong kỳ tuyển sinh 2024
              </p>

            </div>

            <div className="flex gap-3">

              <div
                className="
                  bg-yellow-100
                  text-yellow-700
                  px-4 py-2
                  rounded-xl
                  text-sm font-medium
                "
              >
                ● Chờ duyệt 34
              </div>

              <div
                className="
                  bg-green-100
                  text-green-700
                  px-4 py-2
                  rounded-xl
                  text-sm font-medium
                "
              >
                ● Đã duyệt 128
              </div>

              <div
                className="
                  bg-red-100
                  text-red-600
                  px-4 py-2
                  rounded-xl
                  text-sm font-medium
                "
              >
                ● Bổ sung 12
              </div>

            </div>

          </div>

          {/* TABLE WRAPPER */}
          <div
            className="
              bg-white
              border
              rounded-2xl
              p-5
            "
          >

            {/* FILTER */}
            <div
              className="
                flex justify-between
                items-center
                mb-5
              "
            >

              <div className="flex gap-3">

                <select
                  className="
                    border
                    rounded-xl
                    px-4 py-2.5
                    text-sm
                    outline-none
                  "
                >
                  <option>
                    Lọc theo Ngành học
                  </option>
                </select>

                <select
                  className="
                    border
                    rounded-xl
                    px-4 py-2.5
                    text-sm
                    outline-none
                  "
                >
                  <option>
                    Tất cả trạng thái
                  </option>
                </select>

              </div>

              <div className="flex gap-3">

                <button
                  className="
                    border
                    px-4 py-2.5
                    rounded-xl
                    text-sm
                    hover:bg-gray-50
                  "
                >
                  ⬇ Xuất Excel
                </button>

                <button
                  className="
                    bg-[#4f46e5]
                    text-white
                    px-5 py-2.5
                    rounded-xl
                    text-sm
                    hover:bg-[#4338ca]
                  "
                >
                  + Yêu cầu thêm mới
                </button>

              </div>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr className="text-left text-sm text-gray-500">

                    <th className="px-4 py-4">
                      <input type="checkbox" />
                    </th>

                    <th className="px-4 py-4">
                      MÃ HỒ SƠ
                    </th>

                    <th className="px-4 py-4">
                      HỌ TÊN
                    </th>

                    <th className="px-4 py-4">
                      SỐ ĐIỆN THOẠI
                    </th>

                    <th className="px-4 py-4">
                      NGÀNH ĐĂNG KÝ
                    </th>

                    <th className="px-4 py-4">
                      NGÀY NỘP
                    </th>

                    <th className="px-4 py-4">
                      TRẠNG THÁI
                    </th>

                    <th className="px-4 py-4 text-center">
                      THAO TÁC
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {students.map((student, index) => (

                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="px-4 py-4">
                        <input type="checkbox" />
                      </td>

                      <td className="px-4 py-4">

                        <span
                          className="
                            text-[#4f46e5]
                            bg-[#eef2ff]
                            px-3 py-1
                            rounded-lg
                            text-xs font-semibold
                          "
                        >
                          {student.id}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        <div>

                          <p className="font-semibold">
                            {student.name}
                          </p>

                          <p className="text-sm text-gray-400 mt-1">
                            {student.email}
                          </p>

                        </div>

                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {student.phone}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {student.major}
                      </td>

                      <td className="px-4 py-4 text-gray-500">
                        {student.date}
                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`
                            px-3 py-1
                            rounded-full
                            text-xs font-medium
                            ${getStatusStyle(student.status)}
                          `}
                        >
                          ● {student.status}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        <div
                          className="
                            flex justify-center
                            gap-2
                          "
                        >

                          <button
                            className="
                              w-8 h-8
                              rounded-lg
                              bg-blue-100
                              text-blue-600
                              hover:bg-blue-200
                            "
                          >
                            👁
                          </button>

                          <button
                            className="
                              w-8 h-8
                              rounded-lg
                              bg-purple-100
                              text-purple-600
                              hover:bg-purple-200
                            "
                          >
                            ✎
                          </button>

                          <button
                            className="
                              w-8 h-8
                              rounded-lg
                              bg-red-100
                              text-red-600
                              hover:bg-red-200
                            "
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentReception;