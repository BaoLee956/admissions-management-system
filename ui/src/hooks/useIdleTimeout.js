import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// 15 phút = 15 * 60 * 1000 ms
const IDLE_TIMEOUT_MS = 10 * 60 * 1000;

/**
 * useIdleTimeout
 *
 * Theo dõi hoạt động của người dùng (click, keydown, mousemove, scroll).
 * Nếu không có tương tác nào trong IDLE_TIMEOUT_MS → tự động đăng xuất.
 *
 * Chỉ chạy khi người dùng đã xác thực (isAuthenticated = true).
 */
const useIdleTimeout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const timerRef = useRef(null);

  const handleLogout = useCallback(() => {
    logout();
    alert('Phiên làm việc đã hết hạn do không có hoạt động trong 15 phút. Vui lòng đăng nhập lại.');
    navigate('/login');
  }, [logout, navigate]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, IDLE_TIMEOUT_MS);
  }, [handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['click', 'keydown', 'mousemove', 'scroll'];

    // Bắt đầu đếm lần đầu
    resetTimer();

    // Reset mỗi khi có tương tác
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, resetTimer]);
};

export default useIdleTimeout;
