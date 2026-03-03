import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AdminHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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

  return (
    <div className="admin-header">
      <div className="dropdown-wrapper" ref={dropdownRef}>
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
  );
};

export default AdminHeader;