import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  if (!user || profile?.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
        <p>Welcome to PixelPen Admin Panel 🚀</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
