import Blog from "../models/Blog.js";

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function uniqueSlug(title, id) {
  const base = slugify(title);
  let slug = base;
  let count = 1;
  while (await Blog.findOne({ slug, ...(id ? { _id: { $ne: id } } : {}) })) {
    slug = `${base}-${count++}`;
  }
  return slug;
}

export async function listBlogs(req, res) {
  const { search = "", category = "", status = "published" } = req.query;
  const filter = {};
  if (status !== "all") filter.status = status;
  if (category) filter.category = category;
  if (search) filter.$or = [
    { title: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } }
  ];

  const blogs = await Blog.find(filter)
    .populate("author", "name profileImage")
    .sort({ createdAt: -1 });

  res.json({ blogs });
}

export async function getBlog(req, res) {
  const blog = await Blog.findById(req.params.id).populate("author", "name profileImage");
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.status !== "published" && String(blog.author._id) !== String(req.user?._id))
    return res.status(404).json({ message: "Blog not found" });
  if (blog.status === "published") {
    blog.views += 1;
    await blog.save();
  }
  res.json({ blog });
}

export async function createBlog(req, res) {
  const { title, description, content, featuredImage, category, tags, status } = req.body;
  if (!title || !description || !content)
    return res.status(400).json({ message: "Title, description and content are required" });

  const slug = await uniqueSlug(title);
  const blog = await Blog.create({
    title, slug, description, content, featuredImage, category,
    tags: Array.isArray(tags) ? tags : String(tags || "").split(",").map(x => x.trim()).filter(Boolean),
    status: status || "draft", author: req.user._id
  });
  res.status(201).json({ blog });
}

export async function myBlogs(req, res) {
  const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
  res.json({ blogs });
}

export async function updateBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (String(blog.author) !== String(req.user._id))
    return res.status(403).json({ message: "Not allowed" });

  const data = { ...req.body };
  if (data.title && data.title !== blog.title) data.slug = await uniqueSlug(data.title, blog._id);
  if (data.tags && !Array.isArray(data.tags))
    data.tags = String(data.tags).split(",").map(x => x.trim()).filter(Boolean);

  Object.assign(blog, data);
  await blog.save();
  res.json({ blog });
}

export async function deleteBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (String(blog.author) !== String(req.user._id))
    return res.status(403).json({ message: "Not allowed" });
  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
}
