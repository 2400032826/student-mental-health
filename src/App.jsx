import { Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student-login" replace />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
