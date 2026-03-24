import { useState } from "react";
import Signup from "./Signup";
import AdminLogin from "./AdminLogin";

const AuthLayout = () => {

  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gradient-card)]">

      <div className="relative w-[900px] max-w-full min-h-[560px] rounded-2xl overflow-hidden shadow-2xl">

        {/* FORMS CONTAINER */}
        <div className="absolute top-0 left-0 w-full h-full flex">

          {/* LOGIN SIDE */}
          <div
            className={`w-1/2 h-full flex items-center justify-center transition-all duration-700 ${
              isSignup
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <AdminLogin switchToSignup={() => setIsSignup(true)} />
          </div>


          {/* SIGNUP SIDE */}
          <div
            className={`w-1/2 h-full flex items-center justify-center transition-all duration-700 ${
              isSignup
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <Signup switchToLogin={() => setIsSignup(false)} />
          </div>

        </div>


        {/* GOLD OVERLAY PANEL (Animated Gradient Flow) */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full flex items-center justify-center text-center px-12 overflow-hidden transition-all duration-700 ${
            isSignup ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #8f6a00, #cfae2c, #ffe27a, #cfae2c, #8f6a00)",
            backgroundSize: "300% 300%",
            animation: "goldShift 8s ease-in-out infinite"
          }}
        >

          {!isSignup ? (
            <div>

              <h2 className="text-3xl font-display font-semibold text-black">
                New here?
              </h2>

              <p className="mt-4 text-black/80">
                Create your PixelPen account
              </p>

              <button
                onClick={() => setIsSignup(true)}
                className="mt-6 px-8 py-3 rounded-lg bg-black text-white font-semibold hover:scale-[1.02] transition"
              >
                Signup
              </button>

            </div>
          ) : (
            <div>

              <h2 className="text-3xl font-display font-semibold text-black">
                Welcome Back
              </h2>

              <p className="mt-4 text-black/80">
                Login to continue
              </p>

              <button
                onClick={() => setIsSignup(false)}
                className="mt-6 px-8 py-3 rounded-lg bg-black text-white font-semibold hover:scale-[1.02] transition"
              >
                Login
              </button>

            </div>
          )}

        </div>

      </div>


      {/* GOLD FLOWING GRADIENT ANIMATION */}
      <style>
        {`
        @keyframes goldShift {

          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }

        }
        `}
      </style>

    </div>
  );
};

export default AuthLayout;