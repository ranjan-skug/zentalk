import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) { setError(err.response?.data?.message || "Login failed"); }
  };

  return <AuthPage title="Welcome back" subtitle="Login to continue to your dashboard.">
    <form onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <label>Email<input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})}/></label>
      <label>Password<input type="password" required value={form.password} onChange={e => setForm({...form, password:e.target.value})}/></label>
      <button className="btn primary full">Login</button>
      <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
    </form>
  </AuthPage>;
}

function AuthPage({ title, subtitle, children }) {
  return <div className="auth-page"><div className="auth-card"><Link className="brand" to="/">My<span>Blog</span></Link><h1>{title}</h1><p>{subtitle}</p>{children}</div></div>;
}
