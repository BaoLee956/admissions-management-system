import apiClient from "./apiClient.js";

export const adminApi = {
  ping() {
    return apiClient.get("/health");
  },

  getApprovalRequests() {
    // Sửa lại cho khớp với route: router.get('/requests/pending')
    return apiClient.get("/admin/requests/pending"); 
  },

  respondToRequest(requestId, action, reason = "") {
    // Sửa lại cho khớp với route: router.put('/requests/:id/handle')
    return apiClient.put(`/admin/requests/${requestId}/handle`, {
      action,
      reason // Chú ý: Backend controller nhận trường 'reason'
    });
  },
};