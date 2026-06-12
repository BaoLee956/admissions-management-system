import { useRef } from "react";

const FileDropzone = ({
  label,
  required,
  file,
  onFileChange,
}) => {
  const inputRef = useRef();

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="mb-6">

      <h3 className="font-semibold text-lg mb-1">
        {label}
        {required && (
          <span className="text-red-500"> *</span>
        )}
      </h3>

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        className="
          border-2 border-dashed border-gray-300
          rounded-xl p-8 text-center bg-gray-50
          cursor-pointer hover:border-blue-400
        "
      >

        {!file ? (
          <>
            <p className="text-gray-500">
              Kéo thả file vào đây
            </p>

            <p className="text-sm text-gray-400">
              PDF, JPG, PNG
            </p>
          </>
        ) : (
          <div>
            <p className="font-medium">
              ✅ {file.name}
            </p>

            <p className="text-sm text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.jpg,.png,.jpeg"
          onChange={(e) =>
            handleFile(e.target.files[0])
          }
        />
      </div>
    </div>
  );
};

export default FileDropzone;