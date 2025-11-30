import { Routes, Route, Navigate } from "react-router-dom";

// Login Pages
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";

// Registration Pages
import StudentRegister from "./pages/StudentRegister";
import AdminRegister from "./pages/AdminRegister";

// Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/student-login" replace />} />

      {/* Student Auth */}
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      {/* Admin Auth */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
