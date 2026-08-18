import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const initial = { title:"", description:"", content:"", featuredImage:"", category:"Technology", tags:"", status:"draft" };

export default function BlogEditor() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/blogs/${id}`).then(r => {
      const b = r.data.blog;
      setForm({...b, tags:(b.tags||[]).join(", ")});
    }).catch(e => setError(e.response?.data?.message || "Unable to load blog"));
  }, [id]);

  const change = e => setForm({...form, [e.target.name]:e.target.value});

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      if (id) await api.put(`/blogs/${id}`, form);
      else await api.post("/blogs", form);
      navigate("/dashboard");
    } catch (e) { setError(e.response?.data?.message || "Could not save blog"); }
  };

  return <section className="editor">
    <div className="page-title"><span className="eyebrow">EDITOR</span><h1>{id ? "Edit Blog" : "Create Blog"}</h1></div>
    <form className="editor-form" onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <label>Title<input name="title" required value={form.title} onChange={change} placeholder="Your blog title"/></label>
      <label>Short Description<textarea name="description" required value={form.description} onChange={change} placeholder="A short summary"/></label>
      <div className="two-col">
        <label>Category<select name="category" value={form.category} onChange={change}>{["Technology","Programming","JavaScript","React","Node.js","MongoDB","AI","Career"].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Tags<input name="tags" value={form.tags} onChange={change} placeholder="react, javascript, web"/></label>
      </div>
      <label>Featured Image URL<input name="featuredImage" value={form.featuredImage} onChange={change} placeholder="https://..."/></label>
      <label>Content<textarea className="content-input" name="content" required value={form.content} onChange={change} placeholder="Write your story..."/></label>
      <label>Status<select name="status" value={form.status} onChange={change}><option value="draft">Draft</option><option value="published">Published</option></select></label>
      <div className="actions"><Link className="btn secondary" to="/dashboard">Cancel</Link><button className="btn primary">{form.status === "published" ? "Publish Blog" : "Save Draft"}</button></div>
    </form>
  </section>;
}
