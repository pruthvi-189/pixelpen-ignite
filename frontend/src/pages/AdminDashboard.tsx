import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import "@/styles/admin.css";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHome from "@/components/admin/DashboardHome";
import Events from "@/components/admin/Events";
import Users from "@/components/admin/Users";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) return null;

  if (!user || profile?.role !== "admin") {
    navigate("/");
    return null;
  }

  return (
  <div className="admin-dashboard-layout">
    <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

    <div className="admin-main">
      <AdminHeader />

      {/* ✅ ADD THIS WRAPPER */}
      <div className="admin-content">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "events" && <Events />}
        {activeTab === "users" && <Users />}
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;