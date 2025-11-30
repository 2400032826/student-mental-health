import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    studentId: "",
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

    const students = JSON.parse(localStorage.getItem("students") || "[]");

    const exists = students.find(
      (s) => s.email === form.email || s.studentId === form.studentId
    );
    if (exists) {
      alert("A student with this email or ID already exists.");
      return;
    }

    students.push({
      name: form.name,
      email: form.email,
      studentId: form.studentId,
      password: form.password,
    });

    localStorage.setItem("students", JSON.stringify(students));

    alert("Registered successfully! Please login now.");
    navigate("/student-login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-emerald-200">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Student Registration
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
            name="email"
            type="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
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

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Register
          </button>
        </form>

        <p className="text-gray-700 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/student-login")}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
