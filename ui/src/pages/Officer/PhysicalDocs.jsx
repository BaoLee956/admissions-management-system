import { useState } from "react";
import OfficerSidebar from "../../components/layout/OfficerSidebar";

const PhysicalDocs = () => {

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      major: "CNTT",
      status: "Đã nhận",
    },
    {
      id: 2,
      name: "Trần Minh Quân",
      major: "ATTT",
      status: "Chờ nhận",
    },
    {
      id: 3,
      name: "Lê Thu Hà",
      major: "Marketing",
      status: "Chờ nhận",
    },
  ]);

  const handleReceive = (id) => {

    const updated = students.map((student) =>

      student.id === id
        ? { ...student, status: "Đã nhận" }
        : student
    );

    setStudents(updated);

    alert("Đã tiếp nhận hồ sơ!");
  };

  return (

    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <OfficerSidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold">
            Tiếp nhận hồ sơ bản cứng
          </h1>

          <p className="text-gray-500 mt-1">
            Quản lý tiếp nhận hồ sơ trực tiếp tại trường
          </p>

        </div>

        {/* TABLE */}
        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          overflow-hidden
        ">

          {/* TABLE HEADER */}
          <div className="
            p-5 border-b
            flex justify-between items-center
          ">

            <h2 className="text-xl font-semibold">
              Danh sách sinh viên
            </h2>

            <div className="
              bg-blue-100
              text-blue-700
              px-4 py-2
              rounded-full
              text-sm
            ">
              {students.length} hồ sơ
            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left text-gray-500 text-sm">

                  <th className="px-5 py-4">
                    STT
                  </th>

                  <th className="px-5 py-4">
                    HỌ TÊN
                  </th>

                  <th className="px-5 py-4">
                    NGÀNH
                  </th>

                  <th className="px-5 py-4">
                    TRẠNG THÁI
                  </th>

                  <th className="px-5 py-4 text-center">
                    THAO TÁC
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.map((student, index) => (

                  <tr
                    key={student.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {student.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {student.major}
                    </td>

                    <td className="px-5 py-4">

                      <span className={`
                        px-3 py-1 rounded-full
                        text-sm font-medium
                        ${
                          student.status === "Đã nhận"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}>
                        {student.status}
                      </span>

                    </td>

                    <td className="px-5 py-4 text-center">

                      {student.status === "Chờ nhận" ? (

                        <button
                          onClick={() =>
                            handleReceive(student.id)
                          }
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-4 py-2
                            rounded-lg
                            transition
                          "
                        >
                          Tiếp nhận
                        </button>

                      ) : (

                        <button
                          disabled
                          className="
                            bg-gray-200
                            text-gray-500
                            px-4 py-2
                            rounded-lg
                            cursor-not-allowed
                          "
                        >
                          Đã nhận
                        </button>

                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PhysicalDocs;