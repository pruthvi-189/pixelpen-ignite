import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const DashboardHome = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const { data: users } = await supabase.from("profiles").select("*");
    const { data: events } = await supabase.from("events").select("*");

    setUsersCount(users?.length || 0);
    setEventsCount(events?.length || 0);

    setRecentUsers(users?.slice(0, 5) || []);
  };

  return (
    <div>

      {/* ===== STATS ===== */}
      <div className="stats-grid">

        <div className="stat-card">
          <p>Total Users</p>
          <h2>{usersCount}</h2>
        </div>

        <div className="stat-card">
          <p>Total Events</p>
          <h2>{eventsCount}</h2>
        </div>

        <div className="stat-card">
          <p>Active Now</p>
          <h2>1,203</h2>
        </div>

        <div className="stat-card">
          <p>Revenue</p>
          <h2>$42,500</h2>
        </div>

      </div>

      {/* ===== CHART + USERS ===== */}
      <div className="dashboard-row">

        {/* CHART */}
        <div className="attendance-card">
          <h3>Event Attendance</h3>

          <div className="chart-placeholder">
            {/* simple svg curve */}
            <svg viewBox="0 0 100 40" style={{ width: "100%", height: "100%" }}>
              <path
                d="M0 35 Q 10 32, 20 30 T 40 25 T 60 15 T 80 18 T 100 10"
                fill="none"
                stroke="#f2a60d"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* USERS */}
        <div className="new-users">
          <h3>New Users</h3>

          {recentUsers.map((user) => (
            <div key={user.id} className="user-item">
              <div className="avatar">
                {user.full_name?.charAt(0)}
              </div>

              <div>
                <p>{user.full_name}</p>
                <span>{user.email}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ===== EVENTS TABLE (OPTIONAL BUT IMPORTANT FOR UI MATCH) ===== */}
      <div className="recent-events">
        <h3>Recent Events</h3>

        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Digital Art Expo</td>
              <td>Oct 24</td>
              <td>Upcoming</td>
            </tr>

            <tr>
              <td>Dev Hackathon</td>
              <td>Oct 12</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DashboardHome;