import React from "react";
import { LayoutDashboard, Calendar, Users } from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminSidebar = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="admin-sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-circle">P</div>
        <div>
          <h3>PixelPen Admin</h3>
          <span>CONSOLE</span>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">

        <button
          className={activeTab === "dashboard" ? "menu-item active" : "menu-item"}
          onClick={() => setActiveTab("dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          className={activeTab === "events" ? "menu-item active" : "menu-item"}
          onClick={() => setActiveTab("events")}
        >
          <Calendar size={18} />
          Events
        </button>

        <button
          className={activeTab === "users" ? "menu-item active" : "menu-item"}
          onClick={() => setActiveTab("users")}
        >
          <Users size={18} />
          Users
        </button>

      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>Need help?</p>
        <span>View Documentation</span>
      </div>

    </div>
  );
};

export default AdminSidebar;