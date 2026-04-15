import { apiFetch } from "./apiClient.js";

export const candidateApi = {
  ping() {
    return apiFetch("/health");
  },
};
