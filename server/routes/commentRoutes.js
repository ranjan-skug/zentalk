import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { listComments, createComment, deleteComment } from "../controllers/commentController.js";

const router = Router();
router.get("/:blogId", listComments);
router.post("/:blogId", protect, createComment);
router.delete("/:id", protect, deleteComment);
export default router;
