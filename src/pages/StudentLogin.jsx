import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/student-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-emerald-300 px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-[90%] max-w-md border border-white/40 animate-fadeIn">
        
        <h1 className="text-4xl font-extrabold text-primary text-center mb-2 drop-shadow">
          Student Login
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Student Mental Health Platform - KLU
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="form-label">Student ID / Email</label>
            <input
              type="text"
              placeholder="e.g., S12345 / student@klu.edu"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <button className="cta-button w-full">Login</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link to="/student-register" className="text-primary font-semibold hover:underline">
              Register Here
            </Link>
          </p>

          <p className="mt-2">
            Are you an admin?{" "}
            <Link to="/admin-login" className="text-secondary font-semibold hover:underline">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
