import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface AdminLoginProps {
  onClose: () => void;
  switchToSignup: () => void;
}

const AdminLogin = ({ onClose, switchToSignup }: AdminLoginProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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

      if (error || !data.user) {
        alert(error?.message || "Login failed");
        return;
      }

      // Fetch role from profiles
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      // 🔥 CLOSE MODAL IMMEDIATELY
      onClose();

      // Redirect based on role
      if (profileData?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
      <div
        className="relative w-96 p-8 rounded-2xl text-white"
        style={{
          background: "linear-gradient(145deg, hsl(28 30% 9%), hsl(28 30% 6%))",
          boxShadow: "0 0 30px hsl(42 48% 57% / 0.15)",
        }}
      >
        {/* ✅ FIXED CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#d4af37] text-xl hover:scale-110 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-[#d4af37]/30 text-white focus:border-[#d4af37] outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-[#d4af37]/30 text-white focus:border-[#d4af37] outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-black transition-all hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, hsl(42 48% 57%), hsl(42 60% 70%))",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-[#d4af37] cursor-pointer hover:text-white"
            onClick={() => {
              onClose();
              switchToSignup();
            }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;