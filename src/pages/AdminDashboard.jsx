import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [sessions, setSessions] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [resources, setResources] = useState([]);
  const [moodStats, setMoodStats] = useState({ happy: 3, okay: 4, stressed: 2 });

  // === forms ===
  const [newSession, setNewSession] = useState({
    counselor: "",
    topic: "",
    time: "",
    status: "Pending",
  });

  const [newCounselor, setNewCounselor] = useState({ name: "", hours: "" });
  const [newResource, setNewResource] = useState({ title: "", file: null });

  // === load from storage ===
  useEffect(() => {
    setSessions(JSON.parse(localStorage.getItem("sessions") || "[]"));
    setCounselors(JSON.parse(localStorage.getItem("counselors") || "[]"));
    setResources(JSON.parse(localStorage.getItem("resources") || "[]"));
    setMoodStats(JSON.parse(localStorage.getItem("moodStats") || '{"happy":3,"okay":4,"stressed":2}'));
  }, []);

  // === save to localStorage ===
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
    localStorage.setItem("counselors", JSON.stringify(counselors));
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("moodStats", JSON.stringify(moodStats));
  }, [sessions, counselors, resources, moodStats]);

  // === add session (for all students) ===
  const addSession = (e) => {
    e.preventDefault();
    setSessions([...sessions, { id: Date.now(), ...newSession, student: "" }]); // student empty
    setNewSession({ counselor: "", topic: "", time: "", status: "Pending" });
  };

  const updateStatus = (id, status) => {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  // === add counselor ===
  const addCounselor = (e) => {
    e.preventDefault();
    setCounselors([...counselors, newCounselor]);
    setNewCounselor({ name: "", hours: "" });
  };

  const deleteCounselor = (name) => {
    setCounselors(counselors.filter((c) => c.name !== name));
  };

  // === resource upload ===
  const uploadResource = (e) => {
    e.preventDefault();
    if (!newResource.file) return alert("Select a file");

    const fileURL = URL.createObjectURL(newResource.file);
    setResources([
      ...resources,
      { title: newResource.title, link: fileURL, fileName: newResource.file.name },
    ]);

    setNewResource({ title: "", file: null });
  };

  const changeMood = (type) => {
    setMoodStats({ ...moodStats, [type]: moodStats[type] + 1 });
  };

  const adminProfile = {
    name: "Admin KLU",
    email: "admin@klu.edu.in",
    role: "Administrator",
    totalSessions: sessions.length,
    totalCounselors: counselors.length,
    totalResources: resources.length,
  };

  const navBtn = (id, label) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 p-3 w-full text-left rounded-lg ${
        activeTab === id ? "bg-indigo-700" : "hover:bg-indigo-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

        <nav className="flex-1 space-y-2">
          {navBtn("sessions", "📊 Sessions")}
          {navBtn("counselors", "👥 Counselors")}
          {navBtn("resources", "📘 Resources")}
          {navBtn("mood", "💖 Mood Stats")}
          {navBtn("profile", "👤 Profile")}
        </nav>

        <button
          onClick={() => (window.location.href = "/admin-login")}
          className="bg-red-500 mt-auto py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 space-y-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 capitalize">
          {activeTab}
        </h1>

        {/* ================= SESSIONS TAB ================= */}
        {activeTab === "sessions" && (
          <section className="card">
            <h3 className="text-xl font-semibold mb-4">Create Session (For All Students)</h3>

            <form onSubmit={addSession} className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="Counselor Name"
                value={newSession.counselor}
                onChange={(e) =>
                  setNewSession({ ...newSession, counselor: e.target.value })
                }
                className="input-field"
                required
              />

              <input
                type="text"
                placeholder="Session Topic"
                value={newSession.topic}
                onChange={(e) =>
                  setNewSession({ ...newSession, topic: e.target.value })
                }
                className="input-field"
                required
              />

              <input
                type="text"
                placeholder="Time (e.g. 4 PM)"
                value={newSession.time}
                onChange={(e) =>
                  setNewSession({ ...newSession, time: e.target.value })
                }
                className="input-field"
                required
              />

              <button className="cta-button col-span-2">Add Session</button>
            </form>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Counselor</th>
                  <th className="p-2">Topic</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{s.counselor}</td>
                    <td className="p-2">{s.topic}</td>
                    <td className="p-2">{s.time}</td>

                    <td className="p-2">
                      <select
                        value={s.status}
                        onChange={(e) => updateStatus(s.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option>Pending</option>
                        <option>Conducted</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    <td className="p-2">
                      <button
                        onClick={() => deleteSession(s.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* ================= COUNSELORS ================= */}
        {activeTab === "counselors" && (
          <section className="card">
            <form onSubmit={addCounselor} className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Counselor Name"
                value={newCounselor.name}
                onChange={(e) =>
                  setNewCounselor({ ...newCounselor, name: e.target.value })
                }
                className="input-field"
                required
              />

              <input
                type="text"
                placeholder="Availability (Mon–Fri)"
                value={newCounselor.hours}
                onChange={(e) =>
                  setNewCounselor({ ...newCounselor, hours: e.target.value })
                }
                className="input-field"
                required
              />

              <button className="cta-button w-32">Add</button>
            </form>

            {counselors.map((c) => (
              <div key={c.name} className="flex justify-between border-b p-2">
                {c.name} — {c.hours}
                <button
                  onClick={() => deleteCounselor(c.name)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        )}

        {/* ================ RESOURCES ================= */}
        {activeTab === "resources" && (
          <section className="card">
            <form onSubmit={uploadResource} className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Resource Title"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource({ ...newResource, title: e.target.value })
                }
                className="input-field"
                required
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="border rounded px-2 py-1"
                onChange={(e) =>
                  setNewResource({ ...newResource, file: e.target.files[0] })
                }
                required
              />

              <button className="cta-button w-32">Upload</button>
            </form>

            {resources.map((r, i) => (
              <div key={i} className="flex justify-between border-b p-2">
                {r.title}
                <a
                  href={r.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {r.fileName}
                </a>
              </div>
            ))}
          </section>
        )}

        {/* ================ MOOD TRACKER ================= */}
        {activeTab === "mood" && (
          <section className="card text-center">
            <h3 className="text-xl font-semibold mb-4">Student Mood Stats</h3>

            <div className="flex justify-around mb-4">
              <div>
                <p className="text-3xl text-emerald-500">😊</p>
                <p>Happy: {moodStats.happy}</p>
              </div>
              <div>
                <p className="text-3xl text-yellow-500">😐</p>
                <p>Okay: {moodStats.okay}</p>
              </div>
              <div>
                <p className="text-3xl text-red-500">😟</p>
                <p>Stressed: {moodStats.stressed}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => changeMood("happy")}
                className="cta-button bg-emerald-500"
              >
                + Happy
              </button>
              <button
                onClick={() => changeMood("okay")}
                className="cta-button bg-yellow-500"
              >
                + Okay
              </button>
              <button
                onClick={() => changeMood("stressed")}
                className="cta-button bg-red-500"
              >
                + Stressed
              </button>
            </div>
          </section>
        )}

        {/* ================ PROFILE ================= */}
        {activeTab === "profile" && (
          <section className="card max-w-md mx-auto text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Admin Avatar"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />

            <h3 className="text-2xl font-semibold">{adminProfile.name}</h3>
            <p className="text-gray-500">{adminProfile.email}</p>
            <p className="mt-2 font-semibold text-indigo-600">{adminProfile.role}</p>

            <div className="mt-4 grid grid-cols-3 text-center">
              <div>
                <p className="text-xl font-bold text-primary">{adminProfile.totalSessions}</p>
                <p>Sessions</p>
              </div>
              <div>
                <p className="text-xl font-bold text-secondary">{adminProfile.totalCounselors}</p>
                <p>Counselors</p>
              </div>
              <div>
                <p className="text-xl font-bold text-accent">{adminProfile.totalResources}</p>
                <p>Resources</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
