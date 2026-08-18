import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get("/blogs").then(res => setBlogs(res.data.blogs)).catch(console.error);
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">WELCOME TO MYBLOG</span>
          <h1>Discover stories that <span>inspire.</span></h1>
          <p>Learn, build and grow with practical articles about technology, programming and modern web development.</p>
          <div className="actions">
            <Link className="btn primary" to="/blogs">Explore Blogs</Link>
            <Link className="btn secondary" to="/signup">Create Your Story</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXPLORE</span><h2>Latest Stories</h2></div>
          <Link to="/blogs">View all →</Link>
        </div>
        <div className="grid">
          {blogs.slice(0, 6).map(blog => <BlogCard key={blog._id} blog={blog} />)}
        </div>
        {!blogs.length && <div className="empty">No published blogs yet.</div>}
      </section>
    </>
  );
}
