import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AdminImport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatusMessage("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Vui lòng chọn một tệp Excel hoặc CSV trước!");
      return;
    }

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      alert("Không tìm thấy phiên đăng nhập Admin. Vui lòng đăng nhập lại!");
      navigate("/admin");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/import", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        const count = result.data?.importedCount || 0;
        const msg = `Nhập dữ liệu thành công! Đã import ${count} thí sinh vào hệ thống.`;
        setStatusMessage(msg);
        alert(msg);
        
        // Reset file input
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setIsSuccess(false);
        const errMsg = result.message || "Import dữ liệu thất bại.";
        setStatusMessage(`Lỗi: ${errMsg}`);
        alert(`Lỗi: ${errMsg}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setIsSuccess(false);
      setStatusMessage("Lỗi kết nối máy chủ khi tải tệp lên.");
      alert("Đã xảy ra lỗi kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white text-center flex flex-col gap-1">
          <div className="text-xs uppercase tracking-widest font-semibold opacity-80">Import Panel</div>
          <h3 className="text-xl font-extrabold tracking-wide">Nhập Dữ Liệu Thí Sinh Từ Excel</h3>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-slate-500 text-sm text-center leading-relaxed max-w-lg mx-auto">
            Hệ thống hỗ trợ nhập danh sách thí sinh và kết quả thi từ file Excel (.xlsx, .xls) hoặc CSV. 
            Cột bắt buộc phải chứa các tiêu đề: <span className="font-semibold text-slate-700">"SBD", "Họ Tên", "CCCD"</span>.
          </p>

          {/* Form */}
          <div className="border border-dashed border-slate-300 bg-slate-50 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
              📊
            </div>

            <div className="w-full max-w-sm">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="hidden"
                id="excel-file-input"
                disabled={isLoading}
              />
              <label
                htmlFor="excel-file-input"
                className="
                  inline-block bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 
                  font-semibold px-6 py-2.5 rounded-xl cursor-pointer transition duration-200 text-sm
                  shadow-sm active:scale-95
                "
              >
                📁 {file ? "Chọn tệp khác" : "Chọn tệp từ thiết bị"}
              </label>
            </div>

            {file ? (
              <div className="text-slate-700 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-sm font-medium">
                Tệp đã chọn: <span className="underline font-semibold">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Hỗ trợ định dạng: .xlsx, .xls hoặc .csv
              </p>
            )}
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-xl text-sm font-semibold border ${
              isSuccess 
                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                : "bg-red-50 text-red-700 border-red-200"
            }`}>
              {isSuccess ? "✅ " : "❌ "} {statusMessage}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleUpload}
            disabled={isLoading || !file}
            className={`
              w-full py-3.5 rounded-xl font-bold text-white transition duration-200 flex items-center justify-center gap-2 shadow-md
              ${isLoading 
                ? "bg-slate-400 cursor-not-allowed" 
                : !file 
                  ? "bg-slate-300 cursor-not-allowed shadow-none" 
                  : "bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-[0.98]"}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang xử lý dữ liệu...</span>
              </>
            ) : (
              <span>🚀 Tải lên Dữ liệu</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminImport;
