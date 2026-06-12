import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

const ApprovalRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: "YC-2025-001",
      sender: "Nguyễn Thị Lan",
      role: "Cán bộ danh mục",
      type: "Thêm mới",
      date: "14/06/2025",
      detail:
        "Đề nghị thêm ngành Trí tuệ nhân tạo vào danh mục ngành học.",
      status: "Chờ duyệt",
    },
    {
      id: "YC-2025-002",
      sender: "Trần Minh Đức",
      role: "Cán bộ nhập liệu",
      type: "Xóa",
      date: "14/06/2025",
      detail:
        "Yêu cầu xóa ngành Khoa học dữ liệu do nhập trùng.",
      status: "Chờ duyệt",
    },
    {
      id: "YC-2025-003",
      sender: "Lê Thu Hương",
      role: "Cán bộ danh mục",
      type: "Thêm mới",
      date: "13/06/2025",
      detail:
        "Đề nghị bổ sung đợt tuyển sinh bổ sung tháng 9.",
      status: "Chờ duyệt",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectId, setRejectId] = useState(null);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Đã duyệt" }
          : item
      )
    );
  };

  const openRejectPopup = (id) => {
    setRejectId(id);
    setRejectReason("");
    setShowReject(true);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }

    setRequests((prev) =>
      prev.map((item) =>
        item.id === rejectId
          ? {
              ...item,
              status: "Từ chối",
              rejectReason,
            }
          : item
      )
    );

    setShowReject(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <AdminSidebar />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Phê duyệt yêu cầu
          </h1>

          <p className="text-gray-500 mt-1">
            Maker - Checker
          </p>
        </div>

        {/* STATS */}
        <div className="flex gap-4 mb-6">
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-medium">
            {requests.filter(
              (i) => i.status === "Chờ duyệt"
            ).length}{" "}
            Chờ duyệt
          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
            {requests.filter(
              (i) => i.status === "Đã duyệt"
            ).length}{" "}
            Đã duyệt
          </div>

          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium">
            {requests.filter(
              (i) => i.status === "Từ chối"
            ).length}{" "}
            Từ chối
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-5 py-4">MÃ YÊU CẦU</th>
                <th className="px-5 py-4">NGƯỜI GỬI</th>
                <th className="px-5 py-4">LOẠI</th>
                <th className="px-5 py-4">NGÀY GỬI</th>
                <th className="px-5 py-4">TRẠNG THÁI</th>
                <th className="px-5 py-4 text-center">
                  THAO TÁC
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium text-blue-600">
                    {item.id}
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">
                        {item.sender}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.role}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === "Thêm mới"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.type === "Thêm mới"
                        ? "+ Yêu cầu Thêm mới"
                        : "🗑 Yêu cầu Xóa"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {item.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Đã duyệt"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Từ chối"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedRequest(item);
                          setShowDetail(true);
                        }}
                        className="
                          border
                          px-3 py-2
                          rounded-lg
                          text-sm
                          hover:bg-gray-100
                        "
                      >
                        Xem chi tiết
                      </button>

                      {item.status === "Chờ duyệt" && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(item.id)
                            }
                            className="
                              bg-green-500
                              text-white
                              px-3 py-2
                              rounded-lg
                              text-sm
                              hover:bg-green-600
                            "
                          >
                            Chấp thuận
                          </button>

                          <button
                            onClick={() =>
                              openRejectPopup(item.id)
                            }
                            className="
                              bg-red-500
                              text-white
                              px-3 py-2
                              rounded-lg
                              text-sm
                              hover:bg-red-600
                            "
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* POPUP CHI TIẾT */}
        {showDetail && selectedRequest && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-[600px] p-6">

              <div className="flex justify-between mb-5">
                <h2 className="text-2xl font-bold">
                  Chi tiết yêu cầu
                </h2>

                <button
                  onClick={() => setShowDetail(false)}
                  className="text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p>
                  <b>Mã yêu cầu:</b>{" "}
                  {selectedRequest.id}
                </p>

                <p>
                  <b>Người gửi:</b>{" "}
                  {selectedRequest.sender}
                </p>

                <p>
                  <b>Loại yêu cầu:</b>{" "}
                  {selectedRequest.type}
                </p>

                <p>
                  <b>Nội dung:</b>
                </p>

                <div className="border rounded-xl p-4 bg-gray-50">
                  {selectedRequest.detail}
                </div>

                {selectedRequest.rejectReason && (
                  <>
                    <p>
                      <b>Lý do từ chối:</b>
                    </p>

                    <div className="border rounded-xl p-4 bg-red-50 text-red-600">
                      {selectedRequest.rejectReason}
                    </div>
                  </>
                )}
              </div>

            </div>

          </div>
        )}

        {/* POPUP TỪ CHỐI */}
        {showReject && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-[500px] p-6">

              <h2 className="text-2xl font-bold mb-5">
                Từ chối yêu cầu
              </h2>

              <textarea
                rows={5}
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(e.target.value)
                }
                placeholder="Nhập lý do từ chối..."
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  outline-none
                "
              />

              <div className="flex justify-end gap-3 mt-5">

                <button
                  onClick={() => setShowReject(false)}
                  className="
                    border
                    px-5 py-2
                    rounded-xl
                  "
                >
                  Hủy bỏ
                </button>

                <button
                  onClick={handleReject}
                  className="
                    bg-red-500
                    text-white
                    px-5 py-2
                    rounded-xl
                  "
                >
                  Xác nhận từ chối
                </button>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalRequests;