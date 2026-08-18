import { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

const categories = ["", "Technology", "Programming", "JavaScript", "React", "Node.js", "MongoDB", "AI", "Career"];

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api.get("/blogs", { params: { search, category } }).then(res => setBlogs(res.data.blogs));
  }, [search, category]);

  return (
    <section className="section">
      <div className="page-title"><span className="eyebrow">THE BLOG</span><h1>All Stories</h1></div>
      <div className="filters">
        <input placeholder="Search blogs..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c || "All categories"}</option>)}
        </select>
      </div>
      <div className="grid">{blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}</div>
      {!blogs.length && <div className="empty">No blogs found.</div>}
    </section>
  );
}
