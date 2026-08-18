import { Router } from "express";
import { signup, login, me, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);
router.put("/profile", protect, updateProfile);
export default router;
