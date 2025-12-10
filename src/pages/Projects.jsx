import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { Modal } from "bootstrap";


export default function Projects() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  const [modalData, setModalData] = useState({ title: "", description: "", id: null });

  const fetchProjects = () => {
    api.get("/projects").then((res) => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (proj = null) => {
  if (proj) {
    setModalData({ title: proj.title, description: proj.description, id: proj._id });
  } else {
    setModalData({ title: "", description: "", id: null });
  }

  const modalEl = document.getElementById("projectModal");
  const modal = Modal.getOrCreateInstance(modalEl);
  modal.show();
};

  const saveProject = async () => {
  if (modalData.id) {
    await api.put(`/projects/${modalData.id}`, {
      title: modalData.title,
      description: modalData.description,
    });
  } else {
    await api.post("/projects", {
      title: modalData.title,
      description: modalData.description,
    });
  }

  // CLOSE MODAL
  const modalEl = document.getElementById("projectModal");
  const modal = Modal.getOrCreateInstance(modalEl);
  modal.hide();

  fetchProjects();
};

  const deleteProject = async (id) => {
    if (confirm("Are you sure?")) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Projects</h3>

      {(user.role === "Admin" || user.role === "Manager") && (
        <button className="btn btn-success mb-3" onClick={() => openModal()}>
          + Create Project
        </button>
      )}

      <div className="list-group">
        {projects.map((p) => (
          <div key={p._id} className="list-group-item">
            <h5>{p.title}</h5>
            <p>{p.description}</p>

            <small className="text-muted">
              Created By: {p.createdBy?.name} ({p.createdBy?.role})
            </small>

            <div className="mt-2 d-flex gap-2">

              {(user.role === "Admin" || user.role === "Manager") && (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => openModal(p)}
                >
                  Edit
                </button>
              )}

              {user.role === "Admin" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProject(p._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <div className="modal fade" id="projectModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h4>{modalData.id ? "Edit Project" : "Create Project"}</h4>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={modalData.title}
              onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
            />

            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={modalData.description}
              onChange={(e) =>
                setModalData({ ...modalData, description: e.target.value })
              }
            />

            <button className="btn btn-primary" onClick={saveProject}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
