import apiClient from './apiClient';

export const authApi = {
  /**
   * 1. [Thí sinh] Yêu cầu gửi mã OTP về email
   * @param {Object} data - { sbd: "0100234", cccd: "001082946357" }
   */
  requestOTP: async (data) => {
    const response = await apiClient.post('/auth/candidates/otp', data);
    return response.data;
  },

  /**
   * 2. [Thí sinh] Xác minh mã OTP và lấy Token
   * @param {Object} data - { sbd: "0100234", otpCode: "123456" }
   */
  verifyOTP: async (data) => {
    const response = await apiClient.post('/auth/candidates/verify', data);
    return response.data;
  },

  /**
   * 3. [Cán bộ & Admin] Đăng nhập nội bộ
   * @param {Object} data - { email: "canbo@ptit.edu.vn", password: "123" }
   */
  internalLogin: async (data) => {
    const response = await apiClient.post('/auth/internal/login', data);
    return response.data;
  }
};