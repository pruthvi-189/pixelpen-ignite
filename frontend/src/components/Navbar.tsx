import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/new logo for startup.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/founder", label: "Founder" },
  { to: "/partners", label: "Partners" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, profile } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-black/40 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex w-full items-center justify-between px-10 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="PixelPen" className="h-10 w-10 object-contain" />
          <span className="text-xl font-semibold text-white tracking-wide">
            Pixel<span className="text-[#d4af37]">Pen</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-[#d4af37]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#d4af37] transition-all duration-300 ${
                  location.pathname === link.to ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}

          {/* 🔥 AUTH SECTION */}
          {!user ? (
            <motion.button
              onClick={() => navigate("/signup")}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="relative ml-4 flex items-center justify-center 
                         h-11 w-11 rounded-full 
                         bg-gradient-to-br from-[#f5d76e] via-[#d4af37] to-[#a67c00]
                         shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute top-0 left-[-75%] h-full w-1/2 bg-white/20 rotate-12 animate-[shine_2.5s_infinite]" />
              </span>

              <UserPlus size={18} strokeWidth={2.5} className="text-black z-10" />
            </motion.button>
          ) : (
            <div className="relative ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-11 w-11 rounded-full 
                           bg-gradient-to-br from-[#f5d76e] via-[#d4af37] to-[#a67c00]
                           flex items-center justify-center"
              >
                <User size={18} className="text-black" />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-64 bg-black/95 backdrop-blur-xl 
                               rounded-xl shadow-2xl border border-gray-800 p-4"
                  >
                    <p className="text-white font-semibold">
                      {profile?.full_name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {user.email}
                    </p>

                    {profile?.role === "admin" && (
                      <p className="mt-1 text-xs text-[#d4af37]">
                        Admin Account
                      </p>
                    )}

                    <div className="mt-4 border-t border-gray-700 pt-3 flex flex-col gap-3">
                      <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                      >
                        <Settings size={16} />
                        Edit Profile
                      </button>

                      {profile?.role === "admin" && (
                        <button
                          onClick={() => navigate("/admin-dashboard")}
                          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                        >
                          <User size={16} />
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
        </button>
      </div>

      <style>
        {`
          @keyframes shine {
            0% { left: -75%; }
            100% { left: 125%; }
          }
        `}
      </style>
    </motion.nav>
  );
}
