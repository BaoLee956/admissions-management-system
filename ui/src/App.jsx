import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPortal from "./pages/Candidate/SearchPortal";
import OTPVerify from "./pages/Candidate/OTPVerify";
import AdmissionResult from "./pages/Candidate/AdmissionResult";
import OnlineUpload from "./pages/Candidate/OnlineUpload";
import PhysicalDocs from "./pages/Officer/PhysicalDocs";
import OnlineDocsReview from "./pages/Officer/OnlineDocsReview";
import AdmissionProcess from "./pages/Officer/AdmissionProcess";
import StaffLogin from "./pages/Admin/StaffLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminImport from "./pages/Admin/AdminImport";
import AdminLayout from "./components/layout/AdminLayout";

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
        
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<StaffLogin />} />

        {/* Admin Console Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="import" element={<AdminImport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;