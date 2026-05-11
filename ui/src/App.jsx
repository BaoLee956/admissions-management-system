import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPortal from "./pages/Candidate/SearchPortal";
import OTPVerify from "./pages/Candidate/OTPVerify";
import AdmissionResult from "./pages/Candidate/AdmissionResult";
import OnlineUpload from "./pages/Candidate/OnlineUpload";
import PhysicalDocs from "./pages/Officer/PhysicalDocs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPortal />} />
        <Route path="/otp" element={<OTPVerify />} />
        <Route path="/result" element={<AdmissionResult />} />
        <Route path="/upload" element={<OnlineUpload />} />
        <Route path="/physical-docs" element={<PhysicalDocs />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;