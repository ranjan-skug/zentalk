import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [message, setMessage] = useState("");

  const submit = async e => {
    e.preventDefault();
    const res = await api.put("/auth/profile", { name, profileImage });
    setMessage("Profile updated. Refresh the page to see all changes.");
  };

  return <section className="auth-page"><div className="auth-card">
    <h1>Profile Settings</h1><p>{user?.email}</p>
    <form onSubmit={submit}>
      {message && <div className="success">{message}</div>}
      <label>Name<input value={name} onChange={e=>setName(e.target.value)}/></label>
      <label>Profile Image URL<input value={profileImage} onChange={e=>setProfileImage(e.target.value)}/></label>
      <button className="btn primary full">Save Changes</button>
    </form>
  </div></section>;
}
