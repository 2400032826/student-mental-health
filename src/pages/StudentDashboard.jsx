import React, { useState, useEffect } from "react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("book-session");
  const [sessions, setSessions] = useState([]);
  const [resources, setResources] = useState([]);
  const [mood, setMood] = useState("Neutral");
  const [moodHistory, setMoodHistory] = useState([]);
  const [profile, setProfile] = useState({
    name: "Student KLU",
    email: "student@klu.edu.in",
    id: "23A91A0001",
  });
  const [newSession, setNewSession] = useState({ counselor: "", date: "" });

  // Load data
  useEffect(() => {
    setResources(JSON.parse(localStorage.getItem("resources") || "[]"));
    setSessions(JSON.parse(localStorage.getItem("sessions") || "[]"));
    setMoodHistory(JSON.parse(localStorage.getItem("moodHistory") || "[]"));
  }, []);

  // Save moods
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  const saveMood = (e) => {
    e.preventDefault();
    const entry = { date: new Date().toLocaleDateString(), mood };
    setMoodHistory([...moodHistory, entry]);
    alert("Mood saved successfully!");
  };

  const bookSession = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      student: profile.name,
      counselor: newSession.counselor,
      date: newSession.date,
      status: "Pending",
    };
    const all = JSON.parse(localStorage.getItem("sessions") || "[]");
    localStorage.setItem("sessions", JSON.stringify([...all, newEntry]));
    setSessions([...sessions, newEntry]);
    setNewSession({ counselor: "", date: "" });
    alert("Session booked successfully!");
  };

  // Sidebar button builder
  const navBtn = (id, label, icon) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 p-3 w-full text-left rounded-lg ${
        activeTab === id ? "bg-blue-700" : "hover:bg-blue-700"
      }`}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center">Wellness Hub</h2>
        <nav className="flex-1 space-y-2">
          {navBtn("book-session", "📅 Book Session")}
          {navBtn("my-sessions", "🗓️ My Sessions")}
          {navBtn("resources", "📚 Resources")}
          {navBtn("mood", "💖 Mood Tracker")}
          {navBtn("profile", "👤 Profile")}
        </nav>
        <button
          onClick={() => (window.location.href = "/student-login")}
          className="bg-emerald-500 mt-auto py-2 rounded-lg hover:bg-emerald-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-8">
        <h1 className="text-3xl font-bold text-primary mb-4 capitalize">
          {activeTab.replace("-", " ")}
        </h1>

        {/* === Book Session === */}
        {activeTab === "book-session" && (
          <section className="card">
            <h3 className="text-xl font-semibold mb-3">Book a Counseling Session</h3>
            <form onSubmit={bookSession} className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Counselor Name"
                className="input-field"
                value={newSession.counselor}
                onChange={(e) =>
                  setNewSession({ ...newSession, counselor: e.target.value })
                }
                required
              />
              <input
                type="date"
                className="input-field"
                value={newSession.date}
                onChange={(e) =>
                  setNewSession({ ...newSession, date: e.target.value })
                }
                required
              />
              <button className="cta-button">Book Session</button>
            </form>
          </section>
        )}

        {/* === My Sessions === */}
        {activeTab === "my-sessions" && (
          <section className="card">
            <h3 className="text-xl font-semibold mb-3">My Sessions</h3>
            {sessions.length === 0 ? (
              <p>No sessions booked yet.</p>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Counselor</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions
                    .filter((s) => s.student === profile.name)
                    .map((s) => (
                      <tr key={s.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{s.counselor}</td>
                        <td className="p-2">{s.date}</td>
                        <td className="p-2">{s.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* === Resources === */}
        {activeTab === "resources" && (
          <section className="card">
            <h3 className="text-xl font-semibold mb-3">Helpful Resources</h3>
            {resources.length === 0 ? (
              <p>No resources available right now.</p>
            ) : (
              <ul>
                {resources.map((r, i) => (
                  <li key={i} className="p-2 border-b flex justify-between">
                    {r.title}
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      {r.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* === Mood Tracker === */}
        {activeTab === "mood" && (
          <section className="card text-center">
            <h3 className="text-xl font-semibold mb-3">Track Your Mood</h3>
            <form onSubmit={saveMood}>
              <select
                className="input-field mb-4 w-1/2 mx-auto"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              >
                <option>Great 😄</option>
                <option>Okay 🙂</option>
                <option>Neutral 😐</option>
                <option>Stressed 😟</option>
                <option>Low 😔</option>
              </select>
              <button className="cta-button w-1/2">Save Mood</button>
            </form>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Mood History</h4>
              {moodHistory.length === 0 ? (
                <p>No moods logged yet.</p>
              ) : (
                <ul className="max-h-48 overflow-y-auto border rounded-lg p-2">
                  {moodHistory.map((m, i) => (
                    <li key={i} className="border-b p-1">
                      {m.date}: <span className="font-semibold">{m.mood}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* === Profile === */}
        {activeTab === "profile" && (
          <section className="card max-w-md mx-auto text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="Student Avatar"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold">{profile.name}</h3>
            <p className="text-gray-500">{profile.email}</p>
            <p className="mt-2 text-sm text-gray-600">ID: {profile.id}</p>

            <div className="mt-4 grid grid-cols-3 text-center">
              <div>
                <p className="text-xl font-bold text-primary">
                  {sessions.filter((s) => s.student === profile.name).length}
                </p>
                <p>Sessions</p>
              </div>
              <div>
                <p className="text-xl font-bold text-secondary">
                  {moodHistory.length}
                </p>
                <p>Mood Logs</p>
              </div>
              <div>
                <p className="text-xl font-bold text-accent">{resources.length}</p>
                <p>Resources</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
