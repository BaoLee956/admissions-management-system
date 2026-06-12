import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null, // Lưu thông tin (SBD, Họ tên, Role...)
  token: localStorage.getItem('accessToken') || null,
  role: localStorage.getItem('userRole') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),

  // Hàm gọi khi đăng nhập thành công
  login: (userData, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', userData.role);
    set({ user: userData, token, role: userData.role, isAuthenticated: true });
  },

  // Hàm gọi khi đăng xuất
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    set({ user: null, token: null, role: null, isAuthenticated: false });
  },

  setRole: (role) =>
    set((state) => ({
      user: {
        ...state.user,
        role,
      },
    })),
}));

export default useAuthStore;