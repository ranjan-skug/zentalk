import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { listBlogs, getBlog, createBlog, myBlogs, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = Router();
router.get("/", listBlogs);
router.get("/my", protect, myBlogs);
router.post("/", protect, createBlog);
router.get("/:id", getBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
export default router;
