import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = ({ children }: any) => {
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
