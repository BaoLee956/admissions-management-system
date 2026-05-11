const students = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    major: "CNTT",
    status: "Đã nhận",
  },
  {
    id: 2,
    name: "Trần Minh Quân",
    major: "ATTT",
    status: "Chờ nhận",
  },
];

const PhysicalDocs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          Tiếp nhận hồ sơ bản cứng
        </h1>

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">
                Họ tên
              </th>

              <th className="p-3 text-left">
                Ngành
              </th>

              <th className="p-3 text-left">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b"
              >
                <td className="p-3">
                  {student.name}
                </td>

                <td className="p-3">
                  {student.major}
                </td>

                <td className="p-3">
                  {student.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PhysicalDocs;