import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg px-4 shadow-sm"
      style={{
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    >
      <Link
        className="navbar-brand fw-bold text-white"
        to="/"
        style={{ fontSize: "1.4rem", letterSpacing: "1px" }}
      >
        🔐 RBAC Panel
      </Link>

      <button
        className="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav ms-auto align-items-center gap-3">

          {user?.role === "Admin" && (
            <li className="nav-item">
              <Link className="nav-link text-white nav-link-custom" to="/users">
                👥 Users
              </Link>
            </li>
          )}

          {(user?.role === "Admin" || user?.role === "Manager") && (
            <li className="nav-item">
              <Link className="nav-link text-white nav-link-custom" to="/projects">
                📁 Projects
              </Link>
            </li>
          )}

          {user && (
            <button
              className="btn btn-outline-light btn-sm px-3"
              onClick={logout}
              style={{
                borderRadius: "20px",
                transition: "0.3s",
              }}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
