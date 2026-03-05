import React from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminSidebar = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="admin-sidebar">

      <div className="sidebar-logo">
        <div className="logo-circle">P</div>

        <div>
          <h3>PixelPen Admin</h3>
          <span>CONSOLE</span>
        </div>
      </div>

      <div className="sidebar-menu">

        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>

      </div>

      <div className="sidebar-footer">
        <p>Need help?</p>
        <span>View Documentation</span>
      </div>

    </div>
  );
};

export default AdminSidebar;