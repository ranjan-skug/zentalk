import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);

  const load = () => api.get("/blogs/my").then(r => setBlogs(r.data.blogs));
  useEffect(() => { load(); }, []);

  const remove = async id => {
    if (!confirm("Delete this blog?")) return;
    await api.delete(`/blogs/${id}`);
    load();
  };

  const published = blogs.filter(b => b.status === "published").length;

  return <section className="dashboard">
    <div className="dashboard-head"><div><span className="eyebrow">DASHBOARD</span><h1>Welcome, {user?.name}</h1></div><Link className="btn primary" to="/dashboard/create">+ New Blog</Link></div>
    <div className="stats">
      <Stat label="Total Blogs" value={blogs.length}/><Stat label="Published" value={published}/><Stat label="Drafts" value={blogs.length-published}/><Stat label="Total Views" value={blogs.reduce((a,b)=>a+b.views,0)}/>
    </div>
    <div className="dashboard-panel"><div className="section-head"><h2>My Blogs</h2><Link to="/blogs">View site →</Link></div>
      {blogs.map(blog => <div className="table-row" key={blog._id}><div><strong>{blog.title}</strong><small>{new Date(blog.createdAt).toLocaleDateString()}</small></div><span className={`status ${blog.status}`}>{blog.status}</span><div className="row-actions"><Link to={`/dashboard/edit/${blog._id}`}>Edit</Link><button onClick={()=>remove(blog._id)}>Delete</button></div></div>)}
      {!blogs.length && <div className="empty">You haven't created a blog yet.</div>}
    </div>
    <div className="dashboard-panel profile-mini"><h2>Profile</h2><p>{user?.email}</p><Link to="/dashboard/profile">Edit profile →</Link></div>
  </section>;
}
function Stat({label,value}) { return <div className="stat"><small>{label}</small><strong>{value}</strong></div>; }
