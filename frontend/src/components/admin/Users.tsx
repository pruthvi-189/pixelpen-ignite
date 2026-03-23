import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

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

  return (
    <div className="admin-page">

      <h2>Users</h2>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.mobile_number}</td>
              <td>{user.role}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Users;