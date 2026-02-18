import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // Decode token to check role
      const payload = JSON.parse(
        atob(data.token.split(".")[1])
      );

      if (payload.role !== "admin") {
        alert("Access denied. Not an admin.");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("adminToken", data.token);

      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>s
    </div>
  );
};


export default AdminLogin;
