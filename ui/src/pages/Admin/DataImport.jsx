import { useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/layout/AdminSidebar";

const DataImport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [importType, setImportType] =
    useState("thisinh");

  const [result, setResult] = useState({
    inserted: 0,
    skipped: 0,
  });

  // =========================
  // CHỌN FILE
  // =========================
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreviewData([]);
      setImportData([]);
    }
  };

  // =========================
  // PREVIEW
  // =========================
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file!");
      return;
    }
    
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append(
        "type",
        importType
      );

      const res = await axios.post(
        `http://localhost:4000/api/excel/preview?type=${importType}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setPreviewData(
        res.data.data || []
      );

      setImportData(
        res.data.data || []
      );

      setResult({
        inserted:
          res.data.data?.length || 0,
        skipped: 0,
      });

      alert("Đọc file thành công!");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Đọc file thất bại"
      );
    } finally {
      setLoading(false);
    }
    
  };

  // =========================
  // IMPORT
  // =========================
  const handleImport = async () => {
  if (importData.length === 0) {
    alert("Chưa có dữ liệu!");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:4000/api/excel/import",
      {
        type: importType,
        data: importData,
      }
    );

    setResult({
      inserted: res.data.inserted || 0,
      skipped: res.data.skipped || 0,
    });

    alert("Import thành công!");

    setPreviewData([]);
    setImportData([]);
    setSelectedFile(null);
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
        "Import thất bại"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <AdminSidebar />

      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-2">
            QUẢN TRỊ HỆ THỐNG /
            IMPORT DỮ LIỆU
          </p>

          <h1 className="text-3xl font-bold">
            Import Dữ liệu
          </h1>

          <p className="text-gray-500 mt-2">
            Upload Excel → Xem trước
            → Import Database
          </p>
        </div>

        {/* CARD UPLOAD */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="font-bold text-lg mb-5">
            Upload File Excel
          </h2>

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Loại dữ liệu
            </label>

            <select
              value={importType}
              onChange={(e) =>
                setImportType(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            >
              <option value="thisinh">
                Thí sinh
              </option>

              <option value="diem">
                Chi tiết điểm
              </option>
            </select>
          </div>

          <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">
              📄
            </div>

            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={
                handleFileChange
              }
            />
          </div>

          {selectedFile && (
            <div className="mt-4 bg-green-50 p-4 rounded-xl border">
              <p>
                📄{" "}
                {selectedFile.name}
              </p>

              <p className="text-sm text-gray-500">
                {(
                  selectedFile.size /
                  1024
                ).toFixed(2)}{" "}
                KB
              </p>
            </div>
          )}

          <div className="flex justify-end mt-5">
            <button
              onClick={
                handleUpload
              }
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl"
            >
              {loading
                ? "Đang xử lý..."
                : "Xem trước dữ liệu"}
            </button>
          </div>
        </section>

        {/* PREVIEW */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between mb-5">
            <h2 className="font-bold text-lg">
              Xem trước dữ liệu
            </h2>

            <div className="flex gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {result.inserted} hợp lệ
              </span>

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                {result.skipped} lỗi
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {importType ===
            "thisinh" ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-200">
                    <th className="px-4 py-3">STT</th>
                    <th className="px-4 py-3">Họ tên</th>
                    <th className="px-4 py-3">Ngày sinh</th>
                    <th className="px-4 py-3">Giới tính</th>
                    <th className="px-4 py-3">SĐT</th>
                    <th className="px-4 py-3">CCCD</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Địa chỉ</th>
                    <th className="px-4 py-3">Khu vực</th>
                    <th className="px-4 py-3">Ưu tiên</th>
                  </tr>
                </thead>

                <tbody>
                  {previewData.map((item, index) => (
                    <tr
                      key={index}
                      className="
                        border-b
                        border-slate-700
                        hover:bg-slate-800
                        transition
                      "
                    >
                      <td className="px-4 py-3 text-center">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3">{item.hoTen}</td>

                      <td className="px-4 py-3 text-center">
                        {item.ngaySinh}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {String(item.gioiTinh).trim().toLowerCase() === "nam" ? "Nam" : "Nữ"}
                      </td>

                      <td className="px-4 py-3">{item.sdt}</td>

                      <td className="px-4 py-3">{item.cccd}</td>

                      <td className="px-4 py-3">{item.email}</td>

                      <td className="px-4 py-3">{item.diaChi}</td>

                      <td className="px-4 py-3 text-center">
                        {item.khuVuc}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {item.doiTuongUuTien}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-200">
                    <th className="px-4 py-3 text-center">STT</th>
                    <th className="px-4 py-3 text-center">CCCD</th>
                    <th className="px-4 py-3 text-center">Mã môn</th>
                    <th className="px-4 py-3 text-center">Điểm</th>
                  </tr>
                </thead>

                <tbody>
                  {previewData.map((item, index) => (
                    <tr
                      key={index}
                      className="
                        border-b
                        border-slate-700
                        hover:bg-slate-800
                        transition
                      "
                    >
                      <td className="px-4 py-3 text-center">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 text-center font-medium">
                        {item.cccd}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {item.maMon}
                      </td>

                      <td className="px-4 py-3 text-center font-semibold text-green-400">
                        {item.diemSo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {previewData.length ===
              0 && (
              <div className="text-center py-10 text-gray-400">
                Chưa có dữ liệu
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={
                handleImport
              }
              disabled={
                importData.length ===
                0
              }
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Tiến hành Import
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DataImport;