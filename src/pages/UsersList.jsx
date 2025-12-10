import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import RoleGuard from "../components/RoleGuard";
import api from "../api/api";

export default function UsersList() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <RoleGuard allowed={["Admin", "Manager"]} user={user}>
      <div className="container mt-4">
        <h3 className="mb-3">All Users</h3>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RoleGuard>
  );
}
