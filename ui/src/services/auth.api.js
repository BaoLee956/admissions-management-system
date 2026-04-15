import { apiFetch } from "./apiClient.js";

export const authApi = {
  ping() {
    return apiFetch("/health");
  },
};
