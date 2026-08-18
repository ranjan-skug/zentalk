import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const loadComments = () => api.get(`/comments/${id}`).then(r => setComments(r.data.comments));

  useEffect(() => {
    api.get(`/blogs/${id}`).then(r => setBlog(r.data.blog)).catch(console.error);
    loadComments();
  }, [id]);

  const submitComment = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    await api.post(`/comments/${id}`, { content });
    setContent("");
    loadComments();
  };

  if (!blog) return <div className="center">Loading...</div>;

  return (
    <article className="article">
      <span className="badge">{blog.category}</span>
      <h1>{blog.title}</h1>
      <p className="lead">{blog.description}</p>
      <div className="meta"><span>By {blog.author?.name}</span><span>{new Date(blog.createdAt).toLocaleDateString()}</span><span>{blog.views} views</span></div>
      <img className="article-image" src={blog.featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80"} alt={blog.title} />
      <div className="article-content">{blog.content.split("\n").map((p, i) => <p key={i}>{p}</p>)}</div>

      <section className="comments">
        <h2>Comments</h2>
        {user ? (
          <form onSubmit={submitComment} className="comment-form">
            <textarea placeholder="Write a comment..." value={content} onChange={e => setContent(e.target.value)} />
            <button className="btn primary">Post Comment</button>
          </form>
        ) : <p><Link to="/login">Login</Link> to comment.</p>}
        {comments.map(c => (
          <div className="comment" key={c._id}>
            <strong>{c.user?.name}</strong>
            <small>{new Date(c.createdAt).toLocaleDateString()}</small>
            <p>{c.content}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
