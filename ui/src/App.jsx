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
      </Routes>
    </BrowserRouter>
  );
}

export default App;