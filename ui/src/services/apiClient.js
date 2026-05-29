import axios from 'axios';

// Khởi tạo instance kết nối đến Backend của bạn
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Người gác cổng tự động đính kèm Token trước khi gửi request
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token từ LocalStorage (nơi chúng ta sẽ lưu sau khi đăng nhập)
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// (Tùy chọn) Interceptor bắt lỗi: Tự động văng ra ngoài nếu Token hết hạn (Lỗi 401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
      // Xóa token cũ và có thể redirect về trang đăng nhập tại đây
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
    }
    return Promise.reject(error);
  }
);

export default apiClient;