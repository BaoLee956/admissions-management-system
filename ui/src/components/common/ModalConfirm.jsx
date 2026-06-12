import { useNavigate } from "react-router-dom";

const ConfirmModal = ({ data, onClose }) => {

  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate("/upload");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

        <div className="text-center mb-4">

          <img
            src="/logo.png"
            alt="PTIT"
            className="w-16 mx-auto mb-2"
          />

          <h2 className="text-lg font-semibold">
            Xác nhận nhập học
          </h2>

          <p className="text-sm text-gray-500">
            Bạn có chắc chắn muốn xác nhận nhập học?
          </p>

          <p className="text-xs text-gray-400">
            Hành động này không thể hoàn tác
          </p>

        </div>

        {/* Info */}
        <div className="bg-gray-100 p-3 rounded mb-4 text-sm">

          <p>
            <b>Thí sinh:</b> {data.name}
          </p>

          <p>
            <b>Ngành:</b> {data.major}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-lg"
          >
            Không
          </button>

          <button
            onClick={handleConfirm}
            className="
              flex-1 bg-gray-800 text-white
              py-2 rounded-lg hover:bg-black
            "
          >
            Có, xác nhận
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;