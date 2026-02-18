import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully!");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleUpdatePassword}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-3 mb-6 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 py-3 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
