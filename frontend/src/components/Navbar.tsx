import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

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
                  location.pathname === link.to
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {/* 🔥 PREMIUM SIGNUP BUTTON */}
          <motion.button
            onClick={() => navigate("/signup")}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="relative ml-4 flex items-center justify-center 
                       h-11 w-11 rounded-full 
                       bg-gradient-to-br from-[#f5d76e] via-[#d4af37] to-[#a67c00]
                       shadow-md hover:shadow-xl
                       transition-all duration-300"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute top-0 left-[-75%] h-full w-1/2 bg-white/20 rotate-12 
                               animate-[shine_2.5s_infinite]" />
            </span>

            <UserPlus size={18} strokeWidth={2.5} className="text-black z-10" />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/90 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => navigate("/signup")}
                className="mt-2 rounded-lg bg-gradient-to-r 
                           from-[#f5d76e] to-[#d4af37] 
                           text-black py-2 font-semibold"
              >
                Signup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 Shine Animation Keyframe */}
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
