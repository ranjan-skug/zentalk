import Comment from "../models/Comment.js";

export async function listComments(req, res) {
  const comments = await Comment.find({ blog: req.params.blogId })
    .populate("user", "name profileImage")
    .sort({ createdAt: -1 });
  res.json({ comments });
}

export async function createComment(req, res) {
  const { content } = req.body;
  if (!content?.trim()) return res.status(400).json({ message: "Comment is required" });
  const comment = await Comment.create({
    blog: req.params.blogId,
    user: req.user._id,
    content: content.trim()
  });
  await comment.populate("user", "name profileImage");
  res.status(201).json({ comment });
}

export async function deleteComment(req, res) {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (String(comment.user) !== String(req.user._id))
    return res.status(403).json({ message: "Not allowed" });
  await comment.deleteOne();
  res.json({ message: "Comment deleted" });
}
