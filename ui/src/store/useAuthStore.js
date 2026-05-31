import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {
    name: "Nguyễn Văn A",
    role: "admin", // admin | officer
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