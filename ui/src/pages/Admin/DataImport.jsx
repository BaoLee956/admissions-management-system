import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

const ImportData = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const previewData = [
    {
      id: "HS240001",
      name: "Nguyễn Văn An",
      dob: "15/03/2006",
      block: "A00",
      score: "27.50",
    },
    {
      id: "HS240002",
      name: "Trần Thị Bình",
      dob: "22/07/2006",
      block: "D01",
      score: "29.25",
    },
    {
      id: "HS240003",
      name: "Lê Hoàng Cường",
      dob: "08/11/2005",
      block: "A01",
      score: "24.75",
    },
    {
      id: "HS240004",
      name: "Phạm Thị Dung",
      dob: "01/01/2006",
      block: "B00",
      score: "26.00",
    },
    {
      id: "HS240005",
      name: "Vũ Minh Đức",
      dob: "30/01/2006",
      block: "C00",
      score: "28.00",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file!");
      return;
    }

    alert(`Đã tải file: ${selectedFile.name}`);
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert("Vui lòng tải file trước!");
      return;
    }

    alert("Import dữ liệu thành công!");
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <AdminSidebar />

      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-2">
            QUẢN TRỊ HỆ THỐNG / IMPORT DỮ LIỆU
          </p>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Import Dữ liệu Hệ thống
              </h1>

              <p className="text-gray-500 mt-2">
                Tải lên và xem trước dữ liệu trước khi nhập vào hệ thống
              </p>
            </div>

            <div
              className="
                bg-green-100
                text-green-700
                px-4 py-2
                rounded-full
                text-sm
                font-medium
              "
            >
              ● Hệ thống sẵn sàng
            </div>
          </div>
        </div>

        {/* UPLOAD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4">
            Khu vực Upload File
          </h2>

          <select
            className="
              border
              rounded-xl
              px-4 py-3
              mb-5
              min-w-[250px]
            "
          >
            <option>Thông tin thí sinh</option>
            <option>Ngành học</option>
            <option>Điểm xét tuyển</option>
          </select>

          <div
            className="
              border-2 border-dashed
              border-blue-300
              rounded-2xl
              p-10
              text-center
            "
          >
            <div className="text-5xl mb-4">📄</div>

            <p className="font-semibold">
              Kéo thả file Excel vào đây
            </p>

            <p className="text-sm text-gray-500 mt-2">
              hoặc chọn file từ máy tính
            </p>

            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="mt-5"
            />
          </div>

          {selectedFile && (
            <div
              className="
                mt-5
                bg-green-50
                border
                border-green-200
                rounded-xl
                p-4
              "
            >
              <p className="font-medium">
                📄 {selectedFile.name}
              </p>

              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <div className="flex justify-end mt-5">
            <button
              onClick={handleUpload}
              className="
                bg-blue-600
                text-white
                px-5 py-3
                rounded-xl
                hover:bg-blue-700
              "
            >
              Tải file lên
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">
              Xem trước dữ liệu
            </h2>

            <div className="flex gap-3">
              <div
                className="
                  bg-green-100
                  text-green-700
                  px-3 py-1
                  rounded-full
                  text-sm
                "
              >
                440 dòng hợp lệ
              </div>

              <div
                className="
                  bg-red-100
                  text-red-600
                  px-3 py-1
                  rounded-full
                  text-sm
                "
              >
                10 lỗi
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-sm text-gray-500">
                  <th className="px-4 py-3">STT</th>
                  <th className="px-4 py-3">MÃ HỒ SƠ</th>
                  <th className="px-4 py-3">HỌ TÊN</th>
                  <th className="px-4 py-3">NGÀY SINH</th>
                  <th className="px-4 py-3">KHỐI THI</th>
                  <th className="px-4 py-3">ĐIỂM</th>
                </tr>
              </thead>

              <tbody>
                {previewData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 text-blue-600 font-medium">
                      {item.id}
                    </td>

                    <td className="px-4 py-4">
                      {item.name}
                    </td>

                    <td className="px-4 py-4">
                      {item.dob}
                    </td>

                    <td className="px-4 py-4">
                      {item.block}
                    </td>

                    <td className="px-4 py-4 text-green-600 font-bold">
                      {item.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleImport}
              className="
                bg-blue-600
                text-white
                px-6 py-3
                rounded-xl
                hover:bg-blue-700
              "
            >
              Tiến hành Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportData;