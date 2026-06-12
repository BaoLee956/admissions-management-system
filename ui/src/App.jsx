import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPortal from "./pages/Candidate/SearchPortal";
import OTPVerify from "./pages/Candidate/OTPVerify";
import AdmissionResult from "./pages/Candidate/AdmissionResult";
import OnlineUpload from "./pages/Candidate/OnlineUpload";
import PhysicalDocs from "./pages/Officer/PhysicalDocs";
import OnlineDocsReview from "./pages/Officer/OnlineDocsReview";
import AdmissionProcess from "./pages/Officer/AdmissionProcess";
import AdminLogin from "./pages/Admin/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentReception from "./pages/Officer/StudentReception";
import ApprovalRequests from "./pages/Admin/ApprovalRequests";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import InternalLogin from "./pages/Auth/InternalLogin";
import OfficerDashboard from "./pages/Officer/OfficerDashboard";
import DataImport from "./pages/Admin/DataImport";
import MasterData from "./pages/admin/MasterData";
import UserManagement from "./pages/admin/UserManagement";
import ReportExport from "./pages/Admin/ReportExport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Candidate Routes */}
        <Route path="/" element={<SearchPortal />} />
        <Route path="/otp" element={<OTPVerify />} />

        {/* Protected Candidate Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/result" element={<AdmissionResult />} />
          <Route path="/ket-qua" element={<AdmissionResult />} />
          <Route path="/upload" element={<OnlineUpload />} />
        </Route>

        {/* Officer & Admin Routes */}
        <Route path="/physical-docs" element={<PhysicalDocs />}/>
        <Route path="/review" element={<OnlineDocsReview />} />
        <Route path="/admission-process" element={<AdmissionProcess />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/officer" element={<InternalLogin />} />
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />
        <Route path="/student-reception" element={<StudentReception />} />
        <Route path="/approval-requests" element={<ApprovalRequests />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/import-data" element={<DataImport />} />
        <Route path="/category-management" element={<MasterData />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/report-export" element={<ReportExport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;