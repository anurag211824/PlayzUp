import express from "express";
import { registerUser } from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
// @route POST /api/v1/users/register
// @description Register a new user
// @access Public
router.post("/register",upload.fields([{name: "avatar",maxCount: 1,},{name: "coverImage",maxCount: 1,},]),registerUser);

export default router;
