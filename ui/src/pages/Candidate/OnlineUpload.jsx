import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FileDropzone from "../../components/common/FileDropzone";
import apiClient from "../../services/apiClient";

const OnlineUpload = () => {

  const navigate = useNavigate();

  const [files, setFiles] = useState({
    cccd: null,
    hocBa: null,
    giayTotNghiep: null,
    minhChungUuTien: null,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!files.cccd || !files.hocBa || !files.giayTotNghiep) {
      setErrorMsg("Vui lòng tải lên đầy đủ các tài liệu bắt buộc (*).");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = localStorage.getItem("candidateToken");
      if (!token) {
        setErrorMsg("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("cccd", files.cccd);
      formData.append("hocBa", files.hocBa);
      formData.append("giayTotNghiep", files.giayTotNghiep);
      if (files.minhChungUuTien) {
        formData.append("minhChungUuTien", files.minhChungUuTien);
      }

      const response = await apiClient.post("/enrollment/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        setSuccessMsg("Nộp hồ sơ nhập học trực tuyến thành công!");
        alert("Gửi hồ sơ và xác nhận nhập học thành công!");
        navigate("/ket-qua");
      } else {
        setErrorMsg("Có lỗi xảy ra khi nộp hồ sơ.");
      }
    } catch (err) {
      console.error("Error uploading documents:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Đã xảy ra lỗi kết nối đến máy chủ.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          Tải lên giấy tờ nhập học
        </h1>

        <FileDropzone
          label="Căn cước công dân"
          required
          file={files.cccd}
          onFileChange={(file) =>
            setFiles({ ...files, cccd: file })
          }
        />

        <FileDropzone
          label="Học bạ THPT"
          required
          file={files.hocBa}
          onFileChange={(file) =>
            setFiles({ ...files, hocBa: file })
          }
        />

        <FileDropzone
          label="Giấy chứng nhận tốt nghiệp THPT"
          required
          file={files.giayTotNghiep}
          onFileChange={(file) =>
            setFiles({ ...files, giayTotNghiep: file })
          }
        />

        <FileDropzone
          label="Minh chứng ưu tiên (nếu có)"
          file={files.minhChungUuTien}
          onFileChange={(file) =>
            setFiles({ ...files, minhChungUuTien: file })
          }
        />

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-4 text-sm font-medium">
            ✅ {successMsg}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
            w-full text-white py-3 rounded-xl mt-4 font-semibold transition duration-200
            ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black"}
          `}
        >
          {isSubmitting ? "Đang gửi hồ sơ..." : "Gửi hồ sơ"}
        </button>

      </div>
    </div>
  );
};

export default OnlineUpload;