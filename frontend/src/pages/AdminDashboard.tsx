import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import "@/styles/admin.css"; // create this css file

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  if (!user || profile?.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return (
          <div className="card">
            <h2>Events Management</h2>
            <p>Manage PixelPen events here.</p>
          </div>
        );

      case "users":
        return (
          <div className="card">
            <h2>Users Management</h2>
            <p>Manage registered users here.</p>
          </div>
        );

      default:
        return (
          <div className="card">
            <h2>Dashboard</h2>
            <p>Welcome to PixelPen Admin Panel 🚀</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>PixelPen Admin</h2>

        <div
          className={`sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </div>

        <div
          className={`sidebar-item ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </div>

        <div
          className={`sidebar-item ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div
            className="admin-avatar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            A
          </div>

          {dropdownOpen && (
            <div className="dropdown">
              <div
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>

              <div
                className="dropdown-item"
                onClick={() => navigate("/settings")}
              >
                Settings
              </div>

              <div
                className="dropdown-item"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;