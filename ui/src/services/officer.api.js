import apiClient from "./apiClient.js"; // Import không có dấu ngoặc nhọn

export const officerApi = {
  ping() {
    return apiClient.get("/health"); // Cắt bỏ /api/v1
  },

  // Cán bộ tạo một Yêu cầu phê duyệt
  createApprovalRequest(data) {
    return apiClient.post("/officer/approval-requests", data); // Cắt bỏ /api/v1
  },
};