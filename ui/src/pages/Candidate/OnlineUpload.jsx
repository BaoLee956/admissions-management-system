import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FileDropzone from "../../components/common/FileDropzone";

const OnlineUpload = () => {

  const navigate = useNavigate();

  const [files, setFiles] = useState({
    cccd: null,
    birth: null,
    diploma: null,
    avatar: null,
  });

  const handleSubmit = () => {

    alert("Gửi hồ sơ thành công!");

    navigate("/physical-docs");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          Tải lên giấy tờ
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
          label="Giấy khai sinh"
          required
          file={files.birth}
          onFileChange={(file) =>
            setFiles({ ...files, birth: file })
          }
        />

        <FileDropzone
          label="Bằng tốt nghiệp"
          required
          file={files.diploma}
          onFileChange={(file) =>
            setFiles({ ...files, diploma: file })
          }
        />

        <FileDropzone
          label="Ảnh 3x4"
          file={files.avatar}
          onFileChange={(file) =>
            setFiles({ ...files, avatar: file })
          }
        />

        <button
          onClick={handleSubmit}
          className="
            w-full bg-gray-900 text-white
            py-3 rounded-xl mt-4
            hover:bg-black
          "
        >
          Gửi hồ sơ
        </button>

      </div>
    </div>
  );
};

export default OnlineUpload;