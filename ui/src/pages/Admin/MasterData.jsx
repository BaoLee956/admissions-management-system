import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

const MasterData = () => {

  const [activeTab, setActiveTab] = useState("major");

  const [showEditMajor, setShowEditMajor] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [selectedMajor, setSelectedMajor] = useState(null);

  const [selectedBatch, setSelectedBatch] = useState(null);

  const [majors, setMajors] = useState([
    {
      id: 1,
      code: "CNTT",
      name: "Công nghệ thông tin",
      faculty: "Khoa CNTT",
      status: "Hoạt động",
      updated: "12/06/2025",
    },
    {
      id: 2,
      code: "ATTT",
      name: "An toàn thông tin",
      faculty: "Khoa ATTT",
      status: "Hoạt động",
      updated: "10/06/2025",
    },
    {
      id: 3,
      code: "DTVT",
      name: "Điện tử viễn thông",
      faculty: "Khoa Viễn Thông",
      status: "Tạm ẩn",
      updated: "08/06/2025",
    },
  ]);

  const [batches, setBatches] = useState([
    {
      id: 1,
      code: "DTS001",
      name: "Đợt 1 - 2025",
      start: "01/03/2025",
      end: "30/06/2025",
      students: 1250,
      status: "Đang mở",
    },
    {
      id: 2,
      code: "DTS002",
      name: "Đợt 2 - 2025",
      start: "01/07/2025",
      end: "31/08/2025",
      students: 980,
      status: "Đóng",
    },
  ]);

  const handleUpdateMajor = () => {

    setMajors(
      majors.map((item) =>
        item.id === selectedMajor.id
          ? selectedMajor
          : item
      )
    );

    setShowEditMajor(false);
  };

  const handleToggleBatch = () => {

    setBatches(
      batches.map((item) =>
        item.id === selectedBatch.id
          ? {
              ...item,
              status:
                item.status === "Đang mở"
                  ? "Đóng"
                  : "Đang mở",
            }
          : item
      )
    );

    setShowStatusModal(false);
  };

  return (

    <div className="flex min-h-screen bg-[#f5f7fb]">

      <AdminSidebar />

      <div className="flex-1 p-6">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-sm text-gray-400">
            QUẢN TRỊ HỆ THỐNG / QUẢN LÝ DANH MỤC
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Quản lý Danh mục
          </h1>

          <p className="text-gray-500 mt-1">
            Quản lý các danh mục dữ liệu trong hệ thống
          </p>

        </div>

        {/* TAB */}

        <div className="flex gap-3 mb-6">

          <button
            onClick={() => setActiveTab("major")}
            className={`
              px-5 py-3 rounded-xl font-medium
              ${
                activeTab === "major"
                  ? "bg-[#111827] text-white"
                  : "bg-white border"
              }
            `}
          >
            Ngành học
          </button>

          <button
            onClick={() => setActiveTab("batch")}
            className={`
              px-5 py-3 rounded-xl font-medium
              ${
                activeTab === "batch"
                  ? "bg-[#111827] text-white"
                  : "bg-white border"
              }
            `}
          >
            Đợt tuyển sinh
          </button>

        </div>

        {/* SEARCH */}

        <div className="bg-white p-4 rounded-2xl mb-5">

          <input
            placeholder="Tìm kiếm..."
            className="
              border
              rounded-xl
              px-4 py-3
              w-[350px]
              outline-none
            "
          />

        </div>

        {/* TAB NGÀNH HỌC */}

        {activeTab === "major" && (

          <div className="bg-white rounded-2xl overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left text-gray-500 text-sm">

                  <th className="p-4">STT</th>
                  <th className="p-4">Tên ngành</th>
                  <th className="p-4">Mã ngành</th>
                  <th className="p-4">Khoa</th>
                  <th className="p-4">Ngày cập nhật</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Thao tác</th>

                </tr>

              </thead>

              <tbody>

                {majors.map((item, index) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4 font-medium">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.code}
                    </td>

                    <td className="p-4">
                      {item.faculty}
                    </td>

                    <td className="p-4">
                      {item.updated}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm
                          ${
                            item.status === "Hoạt động"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="p-4">

                      <button
                        onClick={() => {
                          setSelectedMajor(item);
                          setShowEditMajor(true);
                        }}
                        className="
                          bg-blue-100
                          text-blue-600
                          px-3 py-2
                          rounded-lg
                        "
                      >
                        ✏️
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* TAB ĐỢT TUYỂN SINH */}

        {activeTab === "batch" && (

          <div className="bg-white rounded-2xl overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="p-4">Mã đợt</th>
                  <th className="p-4">Tên đợt</th>
                  <th className="p-4">Thời gian</th>
                  <th className="p-4">Thí sinh</th>
                  <th className="p-4">Trạng thái</th>

                </tr>

              </thead>

              <tbody>

                {batches.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.code}
                    </td>

                    <td className="p-4 font-medium">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.start} - {item.end}
                    </td>

                    <td className="p-4">
                      {item.students}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() => {
                          setSelectedBatch(item);
                          setShowStatusModal(true);
                        }}
                        className={`
                          relative
                          w-14 h-7
                          rounded-full
                          transition
                          ${
                            item.status === "Đang mở"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }
                        `}
                      >

                        <div
                          className={`
                            absolute top-1
                            w-5 h-5 bg-white
                            rounded-full transition
                            ${
                              item.status === "Đang mở"
                                ? "left-8"
                                : "left-1"
                            }
                          `}
                        />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* EDIT MAJOR MODAL */}

      {showEditMajor && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[700px] rounded-3xl">

            <div className="p-6 border-b flex justify-between">

              <h2 className="text-3xl font-bold">
                Chỉnh sửa Ngành học
              </h2>

              <button
                onClick={() => setShowEditMajor(false)}
                className="text-3xl"
              >
                ×
              </button>

            </div>

            <div className="p-8 space-y-5">

              <div>

                <label>Tên ngành học</label>

                <input
                  value={selectedMajor.name}
                  onChange={(e) =>
                    setSelectedMajor({
                      ...selectedMajor,
                      name: e.target.value,
                    })
                  }
                  className="
                    w-full mt-2
                    border rounded-2xl
                    px-4 py-4
                  "
                />

              </div>

              <div>

                <label>Mã ngành</label>

                <input
                  disabled
                  value={selectedMajor.code}
                  className="
                    w-full mt-2
                    border rounded-2xl
                    px-4 py-4
                    bg-gray-50
                  "
                />

              </div>

            </div>

            <div className="border-t p-6 flex justify-end gap-4">

              <button
                onClick={() => setShowEditMajor(false)}
                className="
                  px-6 py-3
                  border rounded-xl
                "
              >
                Hủy bỏ
              </button>

              <button
                onClick={handleUpdateMajor}
                className="
                  px-8 py-3
                  bg-[#183B6B]
                  text-white
                  rounded-xl
                "
              >
                Lưu cập nhật
              </button>

            </div>

          </div>

        </div>

      )}

      {/* CONFIRM STATUS */}

      {showStatusModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[650px] rounded-3xl overflow-hidden">

            <div className="p-8 text-center">

              <div className="text-6xl">
                ⚠️
              </div>

              <h2 className="text-3xl font-bold mt-5">
                Xác nhận thay đổi trạng thái
              </h2>

              <p className="text-gray-500 mt-4">
                Bạn có chắc chắn muốn thay đổi trạng thái
                đợt tuyển sinh này?
              </p>

              <p className="text-gray-500 mt-2">
                Việc đóng đợt sẽ chặn thí sinh tra cứu.
              </p>

              <div className="border rounded-2xl p-5 mt-6 text-left">

                <h3 className="font-bold">
                  {selectedBatch.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {selectedBatch.code}
                </p>

                <p className="mt-3">
                  {selectedBatch.status}
                  {" → "}
                  {selectedBatch.status === "Đang mở"
                    ? "Đóng"
                    : "Đang mở"}
                </p>

              </div>

            </div>

            <div className="border-t p-6 flex justify-end gap-4">

              <button
                onClick={() => setShowStatusModal(false)}
                className="
                  px-6 py-3
                  border rounded-xl
                "
              >
                Hủy bỏ
              </button>

              <button
                onClick={handleToggleBatch}
                className="
                  px-8 py-3
                  bg-[#183B6B]
                  text-white
                  rounded-xl
                "
              >
                ✓ Xác nhận
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default MasterData;