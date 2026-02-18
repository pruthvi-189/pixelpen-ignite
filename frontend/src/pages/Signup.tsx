import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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

  // Split full name
  const nameParts = fullName.trim().split(" ");
  const first_name = nameParts[0];
  const last_name = nameParts.slice(1).join(" ") || "";

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        mobile_number: mobile,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      setLoading(false);
      return;
    }

    alert("Signup successful!");
    navigate("/login");

  } catch (error) {
    console.error("Signup Error:", error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

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
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-700"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
