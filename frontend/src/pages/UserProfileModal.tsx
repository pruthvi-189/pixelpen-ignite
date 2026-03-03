import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: Props) {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
  const fetchUserData = async () => {
    if (!user) return;

    // Fetch profile table
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, mobile_number")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setFullName(data.full_name || "");
      setMobile(data.mobile_number || "");
    }

    // Fetch email from auth
    setEmail(user.email || "");
  };

  if (isOpen) {
    fetchUserData();
  }
}, [isOpen, user]);

  const handleSave = async () => {
  if (!user) return;

  try {
    // Password validation
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 1️⃣ Update profile table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        mobile_number: mobile,
      })
      .eq("id", user.id);

    if (profileError) throw profileError;

    // 2️⃣ Update email if changed
    if (email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email,
      });

      if (emailError) throw emailError;
    }

    // 3️⃣ Update password if entered
    if (password) {
      const { error: passError } = await supabase.auth.updateUser({
        password,
      });

      if (passError) throw passError;
    }

    toast({
  title: "Profile Updated",
  description: "Your changes were saved successfully.",
});
    onClose();

  } catch (error: any) {
    toast({
    title: "Update Failed",
    description: error.message,
    variant: "destructive",
  });
  }
};

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-[420px] p-8 modal-card"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile modal"
            title="Close"
            className="absolute top-4 right-4 text-[#d4af37]"
          >
            <X size={18} />
          </button>

          <h2 className="text-2xl text-white text-center mb-6">
            Edit Profile
          </h2>

          <div className="flex flex-col gap-4">
            <input
              className="modal-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              className="modal-input"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              className="modal-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="modal-input"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="modal-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleSave}
              className="gold-button mt-4"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}