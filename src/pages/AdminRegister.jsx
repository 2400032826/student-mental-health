import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    adminId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const admins = JSON.parse(localStorage.getItem("admins") || "[]");

    const exists = admins.find(
      (a) => a.email === form.email || a.adminId === form.adminId
    );
    if (exists) {
      alert("An admin with this email or ID already exists.");
      return;
    }

    admins.push({
      name: form.name,
      email: form.email,
      adminId: form.adminId,
      password: form.password,
    });

    localStorage.setItem("admins", JSON.stringify(admins));

    alert("Admin registered successfully!");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-200">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Admin Registration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            name="adminId"
            placeholder="Admin ID"
            value={form.adminId}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="input-field"
            required
          />

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
            Register Admin
          </button>
        </form>

        <p className="text-gray-700 text-center mt-4">
          Already have an admin account?{" "}
          <span
            onClick={() => navigate("/admin-login")}
            className="text-purple-600 font-semibold cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
