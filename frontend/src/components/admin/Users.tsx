import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) {
      console.error("Error fetching users:", error);
      return;
    }

    setUsers(data || []);
  };

  const filteredUsers = users.filter((user) =>
    user.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Card container */}
      <div className="bg-card border border-border rounded-2xl shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">

          {/* Left side */}
          <h2 className="text-xl font-semibold">
            Users
          </h2>

          {/* Right side search */}
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              bg-muted
              border border-border
              rounded-lg
              px-4 py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-yellow-500/40
              transition
            "
          />

        </div>

        {/* Table */}
        <div className="w-full">

          <table className="w-full text-sm">

            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Mobile</th>
                <th className="text-left px-6 py-3">Role</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
                    border-t border-border
                    transition-all duration-300
                    hover:bg-[#FFD70008]
                    hover:shadow-[0_0_12px_rgba(255,215,0,0.25)]
                    hover:scale-[1.01]
                    cursor-pointer
                  "
                >
                  <td className="px-6 py-3 font-medium">
                    {user.full_name}
                  </td>

                  <td className="px-6 py-3 text-muted-foreground">
                    {user.email}
                  </td>

                  <td className="px-6 py-3">
                    {user.mobile_number}
                  </td>

                  <td className="px-6 py-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Users;