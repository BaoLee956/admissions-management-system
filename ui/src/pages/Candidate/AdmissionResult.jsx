import { useState } from "react";
import ModalConfirm from "../../components/common/ModalConfirm";
const AdmissionResult = () => {
  const [showModal, setShowModal] = useState(false);

  // mock data
  const data = {
    name: "NGUYỄN VĂN AN",
    dob: "15/08/2007",
    sbd: "TS2025004821",
    cccd: "079207004821",
    major: "Công nghệ thông tin",
    majorCode: "7480201",
    score: 26.75,
    benchmark: 24.5,
    status: "TRÚNG TUYỂN",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

      {/* Logo */}
      <div className="text-center mb-6">
        <img 
        src="/logo.png" alt="PTIT" className="w-16 mx-auto mb-2" 
        />
        <h1 className="font-semibold">
          HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
        </h1>
        <p className="text-sm text-gray-500">
          Hệ thống tra cứu tuyển sinh
        </p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-1">
          Kết quả tuyển sinh
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Thông tin kết quả xét tuyển của thí sinh
        </p>

        {/* Info */}
        <div className="text-sm mb-4">
          <p><b>Họ tên:</b> {data.name}</p>
          <p><b>Ngày sinh:</b> {data.dob}</p>
          <p><b>SBD:</b> {data.sbd}</p>
          <p><b>CCCD:</b> {data.cccd}</p>
        </div>

        {/* Major */}
        <div className="bg-gray-100 p-3 rounded mb-4">
          <p className="font-medium">{data.major}</p>
          <p className="text-xs text-gray-500">
            Mã ngành: {data.majorCode}
          </p>
        </div>

        {/* Score */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 border p-3 rounded text-center">
            <p className="text-sm text-gray-500">Điểm chuẩn</p>
            <p className="text-lg font-semibold">
              {data.benchmark}
            </p>
          </div>

          <div className="flex-1 border p-3 rounded text-center">
            <p className="text-sm text-gray-500">
              Điểm của thí sinh
            </p>
            <p className="text-lg font-semibold">
              {data.score}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-green-500 text-white text-center py-2 rounded mb-4 font-semibold">
          {data.status}
        </div>

        <p className="text-xs text-gray-500 text-center mb-4">
          Thí sinh đã vượt điểm chuẩn +2.25 điểm. Chúc mừng!
        </p>

        {/* Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black"
        >
          Xác nhận nhập học
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          Hạn xác nhận nhập học: 30/08/2025
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <ModalConfirm
          data={data}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AdmissionResult;