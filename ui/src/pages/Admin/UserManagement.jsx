import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@edu.vn",
      role: "Admin",
      active: true,
      joinDate: "01/01/2024",
    },
    {
      id: 2,
      name: "Trần Thị Bích",
      email: "bich.tran@edu.vn",
      role: "Admin",
      active: true,
      joinDate: "03/02/2024",
    },
    {
      id: 3,
      name: "Lê Thu Hương",
      email: "huong.le@edu.vn",
      role: "Cán bộ tuyển sinh",
      active: true,
      joinDate: "10/03/2024",
    },
    {
      id: 4,
      name: "Phạm Minh Đức",
      email: "duc.pham@edu.vn",
      role: "Cán bộ tuyển sinh",
      active: true,
      joinDate: "15/03/2024",
    },
    {
      id: 5,
      name: "Hoàng Minh Châu",
      email: "chau.hoang@edu.vn",
      role: "Cán bộ nhập liệu",
      active: true,
      joinDate: "20/04/2024",
    },
    {
      id: 6,
      name: "Vũ Đình Nam",
      email: "nam.vu@edu.vn",
      role: "Cán bộ tuyển sinh",
      active: false,
      joinDate: "05/05/2024",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Cán bộ tuyển sinh",
  });

  const handleToggle = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, active: !user.active }
          : user
      )
    );
  };

  const handleResetPassword = (name) => {
    alert(`Đã reset mật khẩu cho ${name}`);
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser,
      active: true,
      joinDate: new Date().toLocaleDateString(),
    };

    setUsers([...users, user]);

    setNewUser({
      name: "",
      email: "",
      role: "Cán bộ tuyển sinh",
    });

    setShowCreateModal(false);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.active).length;
  const lockedUsers = users.filter((u) => !u.active).length;
  const admins = users.filter(
    (u) => u.role === "Admin"
  ).length;

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <AdminSidebar />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Quản lý Người dùng
            </h1>

            <p className="text-gray-500 mt-1">
              Quản lý tài khoản nội bộ và phân quyền
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="
              bg-blue-600
              text-white
              px-5 py-3
              rounded-xl
              hover:bg-blue-700
            "
          >
            + Tạo tài khoản mới
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-5 mb-6">

          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-500">
              Tổng tài khoản
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {totalUsers}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-500">
              Đang hoạt động
            </p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {activeUsers}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-500">
              Đã khóa
            </p>
            <h2 className="text-3xl font-bold mt-2 text-red-600">
              {lockedUsers}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-500">
              Quản trị viên
            </p>
            <h2 className="text-3xl font-bold mt-2 text-purple-600">
              {admins}
            </h2>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm text-gray-500">

                <th className="px-5 py-4">STT</th>
                <th className="px-5 py-4">HỌ TÊN</th>
                <th className="px-5 py-4">EMAIL</th>
                <th className="px-5 py-4">VAI TRÒ</th>
                <th className="px-5 py-4">TRẠNG THÁI</th>
                <th className="px-5 py-4 text-center">
                  THAO TÁC
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user, index) => (

                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    {(index + 1)
                      .toString()
                      .padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">

                    <p className="font-medium">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Tham gia: {user.joinDate}
                    </p>

                  </td>

                  <td className="px-5 py-4">
                    {user.email}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          handleToggle(user.id)
                        }
                        className={`
                          w-12 h-6 rounded-full relative transition
                          ${
                            user.active
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }
                        `}
                      >

                        <span
                          className={`
                            absolute top-1
                            w-4 h-4
                            bg-white
                            rounded-full
                            transition-all
                            ${
                              user.active
                                ? "left-7"
                                : "left-1"
                            }
                          `}
                        />

                      </button>

                      <span
                        className={`text-sm ${
                          user.active
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {user.active
                          ? "Hoạt động"
                          : "Đã khóa"}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          handleResetPassword(
                            user.name
                          )
                        }
                        className="
                          bg-yellow-100
                          text-yellow-700
                          px-3 py-2
                          rounded-lg
                          text-sm
                          hover:bg-yellow-200
                        "
                      >
                        🔑 Reset MK
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* CREATE USER MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-2xl p-6">

              <div className="flex justify-between mb-5">

                <h2 className="text-2xl font-bold">
                  Tạo tài khoản mới
                </h2>

                <button
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                >
                  ✕
                </button>

              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Họ tên"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      name: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                  "
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                  "
                />

                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                  "
                >
                  <option>
                    Admin
                  </option>

                  <option>
                    Cán bộ tuyển sinh
                  </option>

                  <option>
                    Cán bộ nhập liệu
                  </option>

                </select>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="
                    border
                    px-5 py-2
                    rounded-xl
                  "
                >
                  Hủy
                </button>

                <button
                  onClick={handleCreateUser}
                  className="
                    bg-blue-600
                    text-white
                    px-5 py-2
                    rounded-xl
                  "
                >
                  Tạo tài khoản
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default UserManagement;