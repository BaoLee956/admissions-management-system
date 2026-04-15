import { apiFetch } from "./apiClient.js";

export const officerApi = {
  ping() {
    return apiFetch("/health");
  },
};
