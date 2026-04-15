import { apiFetch } from "./apiClient.js";

export const adminApi = {
  ping() {
    return apiFetch("/health");
  },
};
