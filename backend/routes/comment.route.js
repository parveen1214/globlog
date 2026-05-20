import express from "express";
import { addComment, getComments, deleteComment } from "../controller/comment.controller.js";
import {isAuthentication} from "../middleware/authUser.js";

const router = express.Router();

router.post("/add", isAuthentication, addComment);
router.get("/:blogId", getComments);
router.delete("/:commentId", isAuthentication, deleteComment);

export default router;
