import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">My<span>Blog</span></Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button className="link-btn" onClick={signOut}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="nav-cta" to="/signup">Signup</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
