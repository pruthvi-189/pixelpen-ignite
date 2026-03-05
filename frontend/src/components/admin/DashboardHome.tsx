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

    const { data: users } = await supabase
      .from("profiles")
      .select("*");

    const { data: events } = await supabase
      .from("events")
      .select("*");

    setUsersCount(users?.length || 0);
    setEventsCount(events?.length || 0);

    setRecentUsers(users?.slice(0, 5) || []);
  };

  return (
    <div className="dashboard-page">

      <div className="stats-row">

        <div className="stat-card">
          <h3>Total Users</h3>
          <h1>{usersCount}</h1>
        </div>

        <div className="stat-card">
          <h3>Total Events</h3>
          <h1>{eventsCount}</h1>
        </div>

      </div>

      <div className="recent-users">

        <h3>New Users</h3>

        {recentUsers.map((user) => (
          <div key={user.id} className="user-row">

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
  );
};

export default DashboardHome;