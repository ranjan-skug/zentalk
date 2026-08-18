import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords do not match");
    setError("");
    try {
      const res = await api.post("/auth/signup", { name:form.name, email:form.email, password:form.password });
      login(res.data);
      navigate("/dashboard");
    } catch (err) { setError(err.response?.data?.message || "Signup failed"); }
  };

  return <div className="auth-page"><div className="auth-card">
    <Link className="brand" to="/">My<span>Blog</span></Link>
    <h1>Create your account</h1><p>Start publishing your stories today.</p>
    <form onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <label>Full Name<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})}/></label>
      <label>Email<input type="email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})}/></label>
      <label>Password<input type="password" minLength="6" required value={form.password} onChange={e => setForm({...form,password:e.target.value})}/></label>
      <label>Confirm Password<input type="password" required value={form.confirm} onChange={e => setForm({...form,confirm:e.target.value})}/></label>
      <button className="btn primary full">Create Account</button>
      <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
    </form>
  </div></div>;
}
