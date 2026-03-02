import React from "react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default AdminSidebar;