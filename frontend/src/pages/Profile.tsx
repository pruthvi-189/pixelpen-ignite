import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  const { user, profile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setMobile(profile.mobile || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        mobile: mobile,
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-6 text-center">Edit Profile</h2>

        <input
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          value={user?.email || ""}
          disabled
        />

        <input
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full bg-purple-600 py-2 rounded mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
