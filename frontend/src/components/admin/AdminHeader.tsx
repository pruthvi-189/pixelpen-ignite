import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const AdminHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleLogout = async () => {
  await supabase.auth.signOut();

  // Force redirect BEFORE auth guard kicks in
  window.location.href = "/";
};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside, true);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowNotifications(false);
    }
  };

  if (showNotifications) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, [showNotifications]);

  return (
    <div className="admin-header">

      {/* SEARCH BAR */}
      <div className="admin-search">
        <input
          type="text"
          placeholder="Search analytics, events, or users..."
        />
      </div>


      {/* RIGHT SIDE */}
      <div className="header-right">

        {/* Notification */}
        <div
          className="icon-btn"
          onClick={() => setShowNotifications(true)}
        >
          🔔
        </div>

        {/* Settings */}
        <div className="icon-btn">⚙️</div>


        {/* ADMIN INFO */}
        <div className="admin-info">
          <div className="admin-text">
            <p className="admin-name">
              {profile?.full_name || "Admin User"}
            </p>
            <span className="admin-role">
              {profile?.role || "Super Admin"}
            </span>
          </div>

          {/* AVATAR + DROPDOWN */}
          <div className="dropdown-wrapper" ref={dropdownRef}>

            <div
              className="admin-avatar"
              onClick={() => setOpen(!open)}
            >
              {profile?.full_name?.charAt(0) || "A"}
            </div>

            {open && (
              <div className="dropdown">

                <div
                  className="dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/");
                  }}
                >
                  Home
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/settings");
                  }}
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

        </div>
        {showNotifications && (
          <div className="notif-overlay">

            <div className="notif-modal" ref={modalRef}>

              <h3>Notifications</h3>

              <div className="notif-item">
                🚀 New user registered
              </div>

              <div className="notif-item">
                📊 Report generated successfully
              </div>

              <div className="notif-item">
                ⚡ Server performance improved
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default AdminHeader;