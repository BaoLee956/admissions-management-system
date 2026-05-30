import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const AdmissionResult = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem("candidateToken");
      if (!token) {
        // Nếu không có token -> Redirect về trang nhập SBD (trang chủ)
        navigate("/");
        return;
      }

      try {
        const response = await apiClient.get("/candidates/result", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.success) {
          setResult(response.data.data);
        } else {
          setError("Không thể tải kết quả xét tuyển.");
        }
      } catch (err) {
        console.error("Error fetching result:", err);
        if (err.response && err.response.status === 401) {
          // Token hết hạn hoặc không hợp lệ -> Xóa và redirect
          localStorage.removeItem("candidateToken");
          navigate("/");
        } else {
          setError("Không tìm thấy kết quả xét tuyển hoặc xảy ra lỗi kết nối.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("candidateToken");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Đang tải kết quả xét tuyển...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Đã xảy ra lỗi</h2>
          <p className="text-gray-500 mb-6">{error || "Không tìm thấy dữ liệu xét tuyển."}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const isPass = result.trangThai === "TRÚNG TUYỂN";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      {/* Header PTIT Logo */}
      <div className="text-center mb-8">
        <img 
          src="/logo.png" 
          alt="PTIT Logo" 
          className="w-16 mx-auto mb-3 drop-shadow" 
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
        <h1 className="text-base md:text-lg font-bold text-red-700 tracking-wide">
          HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
        </h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          HỆ THỐNG TRA CỨU KẾT QUẢ TUYỂN SINH
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition duration-300 hover:shadow-2xl">
        {/* Top Banner Status */}
        <div className={`p-6 text-white text-center flex flex-col items-center justify-center gap-2 ${
          isPass ? "bg-gradient-to-r from-emerald-500 to-teal-600" : "bg-gradient-to-r from-rose-500 to-red-600"
        }`}>
          <div className="text-xs uppercase tracking-widest font-semibold opacity-75">Trạng thái kết quả</div>
          <div className="text-3xl font-extrabold tracking-wide drop-shadow-sm">{result.trangThai}</div>
        </div>

        <div className="p-6 md:p-8">
          {/* Section 1: Personal Info */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">Thông tin thí sinh</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Họ và tên thí sinh</span>
                <span className="font-semibold text-gray-800">{result.thiSinh?.hoTen || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Số báo danh (SBD)</span>
                <span className="font-semibold text-gray-800 tracking-wider">{result.sbd}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Số CCCD/Mã định danh</span>
                <span className="font-semibold text-gray-800">{result.thiSinh?.cccd || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Ngành đăng ký xét tuyển</span>
                <span className="font-semibold text-gray-800">{result.nganhHoc?.tenNganh || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Cutoff Score & Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs text-gray-400 block">Mã ngành xét tuyển</span>
                <span className="font-bold text-lg text-slate-700">{result.maNganh}</span>
              </div>
              <div className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                Hệ Đại học
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs text-gray-400 block">Điểm chuẩn ngành</span>
                <span className="font-bold text-lg text-red-600">{result.nganhHoc?.diemChuan || "N/A"}</span>
              </div>
              <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
                Ngưỡng trúng tuyển
              </div>
            </div>
          </div>

          {/* Section 3: Subject Scores */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">Chi tiết điểm số</h3>
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase">
                    <th className="p-3">Môn học</th>
                    <th className="p-3 text-right">Điểm thi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  <tr>
                    <td className="p-3 font-medium">Toán học</td>
                    <td className="p-3 text-right font-semibold">{result.diemToan}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Vật lý</td>
                    <td className="p-3 text-right font-semibold">{result.diemLy}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Hóa học</td>
                    <td className="p-3 text-right font-semibold">{result.diemHoa}</td>
                  </tr>
                  <tr className="bg-amber-50/50">
                    <td className="p-3 font-medium text-amber-800">Điểm ưu tiên / Cộng thêm</td>
                    <td className="p-3 text-right font-semibold text-amber-800">+{result.diemCong}</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-base text-slate-800">
                    <td className="p-4">Tổng điểm xét tuyển</td>
                    <td className="p-4 text-right text-red-600 text-lg">{result.tongDiem}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center leading-relaxed mb-6">
            {isPass 
              ? `Thí sinh đạt ${result.tongDiem} điểm, vượt điểm chuẩn ngành ${result.nganhHoc?.diemChuan || ""} (+${(result.tongDiem - (result.nganhHoc?.diemChuan || 0)).toFixed(2)} điểm). Chúc mừng tân sinh viên Học viện Công nghệ Bưu chính Viễn thông!`
              : `Kết quả xét tuyển dựa trên thông tin đã đăng ký và quy chế tuyển sinh hiện hành.`}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              ↩ Tra cứu lại / Đăng xuất
            </button>
            {isPass && (
              <button
                onClick={() => navigate("/upload")}
                className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                📝 Xác nhận nhập học trực tuyến
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionResult;