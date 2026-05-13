import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnlineDocsReview = () => {

  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  const [activeDoc, setActiveDoc] = useState("cccd");

  const [docs, setDocs] = useState([
    {
      name: "Căn cước công dân (CCCD)",
      status: "Hợp lệ",
      color: "green",
    },
    {
      name: "Học bạ THPT",
      status: "Hợp lệ",
      color: "green",
    },
    {
      name: "Giấy khai sinh",
      status: "Lỗi",
      color: "red",
    },
    {
      name: "Ảnh thẻ 3x4",
      status: "Chưa duyệt",
      color: "gray",
    },
  ]);

  const candidates = [
    {
      name: "Trần Minh Khoa",
      id: "HS2024-00142",
      major: "Khoa CNTT",
      time: "08:32 sáng",
      status: "Chờ duyệt",
    },
    {
      name: "Nguyễn Thùy Linh",
      id: "HS2024-00143",
      major: "Khoa Kinh tế",
      time: "09:15 sáng",
      status: "Chờ duyệt",
    },
    {
      name: "Lê Quang Huy",
      id: "HS2024-00144",
      major: "Khoa Luật",
      time: "09:47 sáng",
      status: "Chờ duyệt",
    },
  ];

  const docImages = {
    cccd: "/cccd-demo.jpg",
    hocba: "/hocba-demo.jpg",
    gks: "/gks-demo.jpg",
  };

  const handleApprove = () => {

    alert("Đã duyệt hồ sơ thành công!");

    const updatedDocs = docs.map((doc) => ({
      ...doc,
      status: "Hợp lệ",
      color: "green",
    }));

    setDocs(updatedDocs);
  };

  const handleRequest = () => {
    alert("Đã gửi yêu cầu bổ sung hồ sơ!");
  };

  return (

    <div className="flex min-h-screen bg-[#f5f7fb]">

      {/* SIDEBAR */}
      <div className="
        w-[250px]
        bg-white
        border-r
        flex flex-col justify-between
      ">

        <div>

          {/* LOGO */}
          <div className="p-6 border-b">

            <div className="flex items-center gap-3">

              <img
                src="/logo.png"
                alt="PTIT"
                className="w-10 h-10"
              />

              <div>

                <h1 className="font-bold text-lg">
                  EduAdmin
                </h1>

                <p className="text-xs text-gray-500">
                  Tuyển sinh 2025
                </p>

              </div>

            </div>

          </div>

          {/* MENU */}
          <div className="p-4 space-y-2">

            <button className="
              w-full text-left
              px-4 py-3 rounded-xl
              hover:bg-gray-100
            ">
              Dashboard
            </button>

            <button
              onClick={() => navigate("/admission-process")}
              className="
                w-full text-left
                px-4 py-3 rounded-xl
                hover:bg-gray-100
              "
            >
              Xét tuyển
            </button>

            <button className="
              w-full text-left
              px-4 py-3 rounded-xl
              bg-[#111827]
              text-white
            ">
              Duyệt hồ sơ
            </button>

            <button
              onClick={() => navigate("/physical-docs")}
              className="
                w-full text-left
                px-4 py-3 rounded-xl
                hover:bg-gray-100
              "
            >
              Tiếp nhận bản cứng
            </button>

          </div>

        </div>

        {/* USER */}
        <div className="p-4 border-t">

          <p className="font-medium">
            Nguyễn Văn A
          </p>

          <p className="text-sm text-gray-500">
            admin@edu.vn
          </p>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="
          flex justify-between
          items-center
          mb-6
        ">

          <div>

            <h1 className="text-3xl font-bold">
              Duyệt Hồ Sơ Trực Tuyến
            </h1>

            <p className="text-gray-500 mt-1">
              Xem xét và phê duyệt hồ sơ tuyển sinh
            </p>

          </div>

          <div className="flex gap-3">

            <div className="
              bg-yellow-100
              text-yellow-700
              px-4 py-2 rounded-full
              text-sm
            ">
              24 hồ sơ chờ duyệt
            </div>

            <div className="
              bg-green-100
              text-green-700
              px-4 py-2 rounded-full
              text-sm
            ">
              156 đã duyệt hôm nay
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-5">

          {/* LEFT */}
          <div className="
            col-span-3
            bg-white
            rounded-2xl
            shadow-sm
            p-4
          ">

            <input
              type="text"
              placeholder="Tìm mã hồ sơ..."
              className="
                w-full
                border
                rounded-xl
                px-4 py-3
                mb-4
              "
            />

            <div className="space-y-3">

              {candidates.map((item, index) => (

                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`
                    border rounded-xl
                    p-4 cursor-pointer
                    transition
                    ${
                      selected === index
                        ? "border-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }
                  `}
                >

                  <div className="
                    flex justify-between
                    items-center
                  ">

                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <span className="
                      text-xs
                      text-yellow-600
                    ">
                      {item.status}
                    </span>

                  </div>

                  <p className="
                    text-sm text-gray-500 mt-1
                  ">
                    {item.id}
                  </p>

                  <p className="
                    text-sm text-gray-500
                  ">
                    {item.major} • {item.time}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-9 space-y-5">

            {/* DOCUMENT VIEW */}
            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              p-5
            ">

              <div className="
                flex justify-between
                items-center
                mb-4
              ">

                <h2 className="font-semibold">
                  Xem tài liệu hồ sơ
                </h2>

                <div className="flex gap-2">

                  <button
                    onClick={() => setActiveDoc("cccd")}
                    className={`
                      px-3 py-2 rounded-lg
                      ${
                        activeDoc === "cccd"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    CCCD
                  </button>

                  <button
                    onClick={() => setActiveDoc("hocba")}
                    className={`
                      px-3 py-2 rounded-lg
                      ${
                        activeDoc === "hocba"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    Học bạ
                  </button>

                  <button
                    onClick={() => setActiveDoc("gks")}
                    className={`
                      px-3 py-2 rounded-lg
                      ${
                        activeDoc === "gks"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    GKS
                  </button>

                </div>

              </div>

              <div className="
                bg-gray-100
                rounded-2xl
                h-[420px]
                flex items-center justify-center
              ">

                <img
                  src={docImages[activeDoc]}
                  alt="preview"
                  className="
                    h-[350px]
                    rounded-xl
                    shadow-lg
                  "
                />

              </div>

            </div>

            {/* REVIEW */}
            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              p-5
            ">

              <h2 className="
                font-semibold
                mb-4
              ">
                Kiểm tra hồ sơ & Phê duyệt
              </h2>

              <div className="space-y-3">

                {docs.map((doc, index) => (

                  <div
                    key={index}
                    className={`
                      border rounded-xl
                      p-4
                      flex justify-between
                      items-center
                      ${
                        doc.color === "green"
                          ? "bg-green-50 border-green-200"
                          : doc.color === "red"
                          ? "bg-red-50 border-red-200"
                          : "bg-gray-50"
                      }
                    `}
                  >

                    <div>

                      <p className="font-medium">
                        {doc.name}
                      </p>

                      <p className="
                        text-sm text-gray-500
                      ">
                        Kiểm tra tài liệu
                      </p>

                    </div>

                    <span className={`
                      text-sm font-medium
                      ${
                        doc.color === "green"
                          ? "text-green-600"
                          : doc.color === "red"
                          ? "text-red-600"
                          : "text-gray-500"
                      }
                    `}>
                      {doc.status}
                    </span>

                  </div>
                ))}

              </div>

              {/* ACTION */}
              <div className="
                flex justify-end
                gap-3
                mt-6
              ">

                <button
                  onClick={handleRequest}
                  className="
                    px-5 py-3
                    rounded-xl
                    border border-orange-400
                    text-orange-500
                    hover:bg-orange-50
                  "
                >
                  Yêu cầu bổ sung
                </button>

                <button
                  onClick={handleApprove}
                  className="
                    px-5 py-3
                    rounded-xl
                    bg-green-600
                    text-white
                    hover:bg-green-700
                  "
                >
                  Duyệt hồ sơ
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OnlineDocsReview;