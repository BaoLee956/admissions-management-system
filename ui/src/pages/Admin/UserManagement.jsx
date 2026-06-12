import { useEffect, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import apiClient from "../../services/apiClient";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "", title: "" });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Cán bộ tuyển sinh",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin/users");
      if (response.data && response.data.success) {
        const mapped = response.data.data.map(u => ({
          id: u.maNhanVien,
          name: u.hoTen,
          email: u.email,
          role: u.nhomQuyen ? (u.nhomQuyen.tenNhom === "Admin" ? "Admin" : "Cán bộ tuyển sinh") : "Cán bộ tuyển sinh",
          active: u.trangThai,
          joinDate: new Date(u.createdAt).toLocaleDateString("vi-VN"),
        }));
        setUsers(mapped);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (id) => {
    try {
      const response = await apiClient.put(`/admin/users/${id}/toggle`);
      if (response.data && response.data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id
              ? { ...user, active: !user.active }
              : user
          )
        );
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật trạng thái tài khoản");
    }
  };

  const handleResetPassword = async (id, name) => {
    try {
      const response = await apiClient.put(`/admin/users/${id}/reset-password`);
      if (response.data && response.data.success) {
        setCredentials({
          email: name,
          password: response.data.newPassword,
          title: "Reset mật khẩu thành công!",
        });
        setShowCredentialsModal(true);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi reset mật khẩu");
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản của "${name}" không?`)) {
      return;
    }

    try {
      const response = await apiClient.delete(`/admin/users/${id}`);
      if (response.data && response.data.success) {
        alert("Xóa tài khoản thành công!");
        await fetchUsers();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Lỗi khi xóa tài khoản");
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await apiClient.post("/admin/users", {
        hoTen: newUser.name,
        email: newUser.email,
        role: "Officer", // Admin can only create Officer accounts
      });

      if (response.data && response.data.success) {
        const created = response.data.data;
        setCredentials({
          email: created.email,
          password: created.matKhau,
          title: "Tạo tài khoản thành công!",
        });
        setShowCredentialsModal(true);

        await fetchUsers();

        setNewUser({
          name: "",
          email: "",
          role: "Cán bộ tuyển sinh",
        });

        setShowCreateModal(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Lỗi khi tạo tài khoản");
    }
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
                <th className="px-5 py-4 text-center">VAI TRÒ</th>
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

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-block w-40 text-center py-1.5 rounded-full text-xs font-semibold border ${
                        user.role === "Admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
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
                          ${user.active
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
                            ${user.active
                              ? "left-7"
                              : "left-1"
                            }
                          `}
                        />

                      </button>

                      <span
                        className={`text-sm ${user.active
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

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          handleResetPassword(
                            user.id,
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

                      {user.role !== "Admin" && (
                        <button
                          onClick={() =>
                            handleDeleteUser(
                              user.id,
                              user.name
                            )
                          }
                          className="
                            bg-red-100
                            text-red-700
                            px-3 py-2
                            rounded-lg
                            text-sm
                            hover:bg-red-200
                          "
                        >
                          🗑️ Xóa
                        </button>
                      )}

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

        {/* CREDENTIALS MODAL (COPYABLE) */}
        {showCredentialsModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[450px] rounded-2xl p-6 shadow-2xl relative">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                {credentials.title}
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">TÀI KHOẢN (EMAIL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={credentials.email}
                      className="flex-1 bg-gray-50 border rounded-xl px-4 py-2 text-gray-700 outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(credentials.email);
                        alert("Đã sao chép email!");
                      }}
                      className="bg-gray-100 hover:bg-gray-200 px-3 rounded-xl text-sm font-medium"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">MẬT KHẨU MỚI</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={credentials.password}
                      className="flex-1 bg-gray-50 border border-green-200 font-mono font-bold text-green-700 rounded-xl px-4 py-2 outline-none text-lg"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(credentials.password);
                        alert("Đã sao chép mật khẩu!");
                      }}
                      className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-3 rounded-xl text-sm"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowCredentialsModal(false)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 font-semibold"
                >
                  Đóng
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