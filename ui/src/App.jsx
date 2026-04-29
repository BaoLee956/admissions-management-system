import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPortal from "./pages/Candidate/SearchPortal";
import OTPVerify from "./pages/Candidate/OTPVerify";
import AdmissionResult from "./pages/Candidate/AdmissionResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPortal />} />
        <Route path="/otp" element={<OTPVerify />} />
        <Route path="/result" element={<AdmissionResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;