import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Small delay to allow AuthContext to update
      setTimeout(() => {
        if (profile?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 500);

    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl text-white text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p
            className="text-sm text-right text-purple-400 cursor-pointer mb-4"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
