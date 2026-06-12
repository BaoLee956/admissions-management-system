import { useState, useEffect } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { adminApi } from "../../services/admin.api";

const ApprovalRequests = () => {
  // Trạng thái lưu trữ danh sách yêu cầu từ Backend thay cho dữ liệu giả
  const [requests, setRequests] = useState([]);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tự động kích hoạt tải dữ liệu ngay khi cấu phần được kết nối lên giao diện
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getApprovalRequests();
      console.log("Dữ liệu nhận được từ Backend:", response.data.data);
      if (response && response.data && response.data.data) {
        setRequests(response.data.data);
      } else if (response && response.data) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách yêu cầu phê duyệt:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý sự kiện khi Admin phê duyệt yêu cầu (APPROVED)
  const handleApprove = async (id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn DUYỆT yêu cầu này?");
    if (!isConfirm) return;
    try {
      await adminApi.respondToRequest(id, "APPROVED", "Admin đã phê duyệt thành công");
      alert("Đã phê duyệt yêu cầu thành công!");
      fetchRequests(); // Cập nhật lại danh sách mới từ hệ thống
    } catch (error) {
      console.error("Lỗi hệ thống khi thực hiện phê duyệt:", error);
      alert("Đã xảy ra lỗi trong quá trình phê duyệt, vui lòng thử lại!");
    }
  };

  // Mở hộp thoại nhập lý do từ chối
  const openRejectModal = (id) => {
    setSelectedId(id);
    setShowReject(true);
  };

  // Xử lý sự kiện khi Admin xác nhận từ chối (REJECTED) kèm theo lý do cụ thể
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối yêu cầu này!");
      return;
    }
    try {
      await adminApi.respondToRequest(selectedId, "REJECTED", rejectReason);
      alert("Đã thực hiện từ chối yêu cầu thành công!");
      setShowReject(false);
      setRejectReason("");
      fetchRequests(); // Làm mới lại bảng thông tin
    } catch (error) {
      console.error("Lỗi hệ thống khi thực hiện từ chối:", error);
      alert("Đã xảy ra lỗi trong quá trình từ chối, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Thanh điều hướng bên trái của hệ thống quản trị */}
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yêu cầu phê duyệt</h1>
            <p className="text-gray-500 mt-1">
              Danh sách các yêu cầu thay đổi dữ liệu từ Cán bộ tuyển sinh (Cơ chế Maker - Checker)
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 font-medium">Đang tải danh sách dữ liệu từ máy chủ...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
                  <th className="p-4 pl-6">Mã Yêu Cầu</th>
                  <th className="p-4">Người Gửi</th>
                  <th className="p-4">Loại Yêu Cầu</th>
                  <th className="p-4">Nội Dung / Lý Do</th>
                  <th className="p-4">Trạng Thái</th>
                  <th className="p-4 pr-6 text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 text-sm">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-400">
                      Hiện tại không có yêu cầu nào đang chờ xử lý trên hệ thống.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => {
                    // Cơ chế linh hoạt giúp tự động nhận diện cả cấu trúc Mock cũ và cấu trúc DB mới
                    const requestId = req.id || req.maYeuCau;
                    const requestType = req.type || req.loaiYeuCau;
                    const requestDetail = req.detail || req.liDoYeuCau || "Không có lý do";
                    const requestStatus = req.status || req.trangThai;
                    const requestSender = req.sender || (req.NhanVien ? req.NhanVien.hoTen : "Cán bộ tuyển sinh");

                    const isPending = requestStatus === "Chờ duyệt" || requestStatus === "PENDING";

                    return (
                      <tr key={requestId} className="hover:bg-gray-50/50 transition">
                        <td className="p-4 pl-6 font-medium text-gray-900">#{requestId}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-800">{requestSender}</p>
                            <p className="text-xs text-gray-400">{req.role || "Phòng Đào tạo"}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600">
                            {requestType}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs truncate text-gray-600" title={requestDetail}>
                          {requestDetail}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            isPending
                              ? "bg-amber-50 text-amber-600 border border-amber-100"
                              : requestStatus === "Đã duyệt" || requestStatus === "APPROVED"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-rose-50 text-rose-600 border border-rose-100"
                          }`}>
                            {isPending ? "Chờ duyệt" : (requestStatus === "APPROVED" || requestStatus === "Đã duyệt" ? "Đã duyệt" : "Từ chối")}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-center">
                          {isPending && (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleApprove(requestId)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-1.5 rounded-xl text-xs transition shadow-sm"
                              >
                                Duyệt
                              </button>
                              <button
                                onClick={() => openRejectModal(requestId)}
                                className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-1.5 rounded-xl text-xs transition shadow-sm"
                              >
                                Từ chối
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Hộp thoại phương thức nhập lý do từ chối hồ sơ / yêu cầu */}
        {showReject && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[500px] p-6 shadow-xl border border-gray-100 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Từ chối yêu cầu
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Vui lòng cung cấp lý do chi tiết để phản hồi và gửi thông báo lại cho cán bộ thực hiện nghiệp vụ.
              </p>

              <textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối cụ thể tại đây..."
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition resize-none"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => {
                    setShowReject(false);
                    setRejectReason("");
                  }}
                  className="border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-5 py-2 rounded-xl transition"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleReject}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-5 py-2 rounded-xl transition shadow-sm"
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