import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface SignupProps {
  onClose?: () => void;
  switchToLogin?: () => void;
}

const Signup = ({ onClose, switchToLogin }: SignupProps) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          mobile_number: mobile,
        },
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
// 🔥 Close modal first
onClose?.();

// 🔥 Then redirect
navigate("/");

// Stop loading
setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
      <form
        onSubmit={handleSignup}
        className="relative w-96 p-8 rounded-2xl text-white"
        style={{
          background: "linear-gradient(145deg, hsl(28 30% 9%), hsl(28 30% 6%))",
          boxShadow: "0 0 30px hsl(42 48% 57% / 0.15)",
        }}
      >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-[#d4af37] text-xl hover:scale-110 transition"
          >
            ✕
          </button>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
         className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-[#d4af37]/30 focus:border-[#d4af37] outline-none transition"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-[#d4af37]/30 focus:border-[#d4af37] outline-none transition"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-[#d4af37]/30 focus:border-[#d4af37] outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-[#d4af37]/30 focus:border-[#d4af37] outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-6 rounded-lg bg-black/40 border border-[#d4af37]/30 focus:border-[#d4af37] outline-none transition"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full p-3 rounded-lg font-semibold text-black transition-all"
          style={{
            background: "linear-gradient(135deg, hsl(42 48% 57%), hsl(42 60% 70%))",
          }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-[#d4af37] hover:underline cursor-pointer"
            onClick={switchToLogin}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;