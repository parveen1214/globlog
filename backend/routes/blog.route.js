import express from "express";
import { createBlog, getAllBlogs,  likeBlog,  myBlogs, updateBlog , getBlogsByCreator, getLatestBlogs, getCategory, getBlogById , deleteBlog } from "../controller/blog.controller.js";
import { isAuthentication } from "../middleware/authUser.js";



const router = express.Router();

// Create a new blog
router.post("/create-blog", isAuthentication, createBlog);

// Delete a blog
router.delete("/delete/:id", isAuthentication, deleteBlog);
  
// Get all blogs
router.get("/all-blogs", getAllBlogs);
router.get("/latest", getLatestBlogs);
// Get logged-in user's blogs
router.get("/my-blog", isAuthentication, myBlogs);

router.get("/creator-blogs/:creatorId", getBlogsByCreator);

// Get blogs by category (placed before the dynamic route to avoid conflicts)
router.get("/category/:category", getCategory);

router.put("/like/:id", isAuthentication, likeBlog); // Like a blog

// Update a blog
router.put("/update/:id", isAuthentication, updateBlog);

// Get a single blog by ID (dynamic route should be last to avoid catching other paths)
router.get("/:id", getBlogById);



export default router;

