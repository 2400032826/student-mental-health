import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 to-amber-300 px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-[90%] max-w-md border border-white/40 animate-fadeIn">

        <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-2 drop-shadow">
          Admin Login
        </h1>

        <p className="text-gray-600 text-center mb-6 text-sm">
          Student Mental Health Platform – KLU
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label">Admin Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
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

          <button className="cta-button w-full bg-indigo-600 hover:bg-indigo-700">
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an admin account?{" "}
            <Link
              to="/admin-register"
              className="text-indigo-700 font-semibold hover:underline"
            >
              Register Here
            </Link>
          </p>

          <p className="mt-2">
            Are you a student?{" "}
            <Link
              to="/student-login"
              className="text-emerald-700 font-semibold hover:underline"
            >
              Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
