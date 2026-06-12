import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

/**
 * RoleProtectedRoute
 *
 * Props:
 *   allowedRoles: string[]  – Danh sách role được phép truy cập (e.g. ['ADMIN'] hoặc ['OFFICER', 'ADMIN'])
 *
 * Logic:
 *   1. Chưa đăng nhập  → redirect /login
 *   2. Đã đăng nhập nhưng sai role → redirect về dashboard mặc định của role đó
 *   3. Đúng role → render <Outlet />
 */
const RoleProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuthStore();

  // 1. Chưa xác thực → về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Sai role → redirect về dashboard tương ứng
  if (!allowedRoles.includes(role)) {
    if (role === 'ADMIN') return <Navigate to="/admin-dashboard" replace />;
    if (role === 'OFFICER') return <Navigate to="/officer-dashboard" replace />;
    // CANDIDATE hoặc unknown → về trang chủ thí sinh
    return <Navigate to="/" replace />;
  }

  // 3. Đúng role → cho vào
  return <Outlet />;
};

export default RoleProtectedRoute;
