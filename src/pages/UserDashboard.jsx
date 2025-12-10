import { useEffect, useState } from "react";
import api from "../api/api";

export default function UserDashboard() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Dashboard</h2>
      <p className="text-muted">You can only view projects.</p>

      <div className="list-group mt-3">
        {projects.length === 0 && (
          <p className="text-muted">No projects available.</p>
        )}

        {projects.map((p) => (
          <div key={p._id} className="list-group-item">
            <h5>{p.title}</h5>
            <p>{p.description}</p>

            <small className="text-muted">
              Created By: {p.createdBy?.name} ({p.createdBy?.role})
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
