import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-amber-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">Admin Panel</h1>
        <p className="text-gray-500 mb-6">Wellness Management - KLU</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Admin Username" className="input-field" required />
          <input type="password" placeholder="Password" className="input-field" required />
          <button className="cta-button bg-indigo-600 hover:bg-indigo-700">Login</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Are you a student?{" "}
          <a href="/student-login" className="text-emerald-600 font-semibold hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
