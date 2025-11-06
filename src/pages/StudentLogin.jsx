import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/student-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Student Wellness Platform - KLU</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Student ID / Email" className="input-field" required />
          <input type="password" placeholder="Password" className="input-field" required />
          <button className="cta-button">Login</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Are you an admin?{" "}
          <a href="/admin-login" className="text-secondary font-semibold hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
