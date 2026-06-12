import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Candidate Pages
import SearchPortal from "./pages/Candidate/SearchPortal";
import OTPVerify from "./pages/Candidate/OTPVerify";
import AdmissionResult from "./pages/Candidate/AdmissionResult";
import OnlineUpload from "./pages/Candidate/OnlineUpload";

// Officer Pages
import PhysicalDocs from "./pages/Officer/PhysicalDocs";
import OnlineDocsReview from "./pages/Officer/OnlineDocsReview";
import AdmissionProcess from "./pages/Officer/AdmissionProcess";
import StudentReception from "./pages/Officer/StudentReception";
import OfficerDashboard from "./pages/Officer/OfficerDashboard";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ApprovalRequests from "./pages/Admin/ApprovalRequests";
import DataImport from "./pages/Admin/DataImport";
import MasterData from "./pages/admin/MasterData";
import UserManagement from "./pages/admin/UserManagement";
import ReportExport from "./pages/Admin/ReportExport";

// Auth & Guards
import InternalLogin from "./pages/Auth/InternalLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import useIdleTimeout from "./hooks/useIdleTimeout";

// AppRoutes tách riêng để có thể dùng hooks (useNavigate cần nằm trong BrowserRouter)
function AppRoutes() {
  // Idle Timeout: 15 phút không tương tác → tự đăng xuất
  useIdleTimeout();

  return (
    <Routes>
      {/* ── PUBLIC CANDIDATE ROUTES ─────────────────── */}
      <Route path="/" element={<SearchPortal />} />
      <Route path="/otp" element={<OTPVerify />} />
      <Route path="/login" element={<InternalLogin />} />

      {/* Legacy redirects */}
      <Route path="/admin" element={<Navigate to="/login" replace />} />
      <Route path="/officer" element={<Navigate to="/login" replace />} />

      {/* ── PROTECTED CANDIDATE ROUTES ──────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route path="/result" element={<AdmissionResult />} />
        <Route path="/ket-qua" element={<AdmissionResult />} />
        <Route path="/upload" element={<OnlineUpload />} />
      </Route>

      {/* ── OFFICER ROUTES (OFFICER + ADMIN) ────────── */}
      <Route element={<RoleProtectedRoute allowedRoles={['OFFICER', 'ADMIN']} />}>
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />
        <Route path="/physical-docs" element={<PhysicalDocs />} />
        <Route path="/review" element={<OnlineDocsReview />} />
        <Route path="/admission-process" element={<AdmissionProcess />} />
        <Route path="/student-reception" element={<StudentReception />} />
      </Route>

      {/* ── ADMIN ROUTES (ADMIN only) ────────────────── */}
      <Route element={<RoleProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/approval-requests" element={<ApprovalRequests />} />
        <Route path="/import-data" element={<DataImport />} />
        <Route path="/category-management" element={<MasterData />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/report-export" element={<ReportExport />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;