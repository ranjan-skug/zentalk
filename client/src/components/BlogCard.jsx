import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <article className="card blog-card">
      <img
        src={blog.featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80"}
        alt={blog.title}
      />
      <div className="card-body">
        <span className="badge">{blog.category}</span>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        <div className="meta">
          <span>{blog.author?.name || "Author"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <Link className="read-more" to={`/blogs/${blog._id}`}>Read More →</Link>
      </div>
    </article>
  );
}
