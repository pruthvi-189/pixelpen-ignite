import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AdminHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="admin-header">
      <div
        className="admin-avatar"
        onClick={() => setOpen(!open)}
      >
        A
      </div>

      {open && (
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
  );
};

export default AdminHeader;