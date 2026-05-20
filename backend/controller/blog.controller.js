import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';


export const createBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        if (!req.files || !req.files.blogImage) {
            return res.status(400).json({ message: "Blog image is required" });
        }

        const blogImage = req.files.blogImage;
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: "Invalid file format. Use JPEG, JPG, PNG, or WEBP" });
        }

        const { title, category, about, content } = req.body;
        if (!title || !category || !about || !content) {
            return res.status(400).json({ message: "Title, category, about and content are required" });
        }

        //  Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath, {
            folder: "blog_images"
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({ message: "Cloudinary upload failed", error: cloudinaryResponse.error });
        }

        const blogData = {
            title,category,about,content,adminName: req.user.name,adminPhoto: req.user.photo.url, createdBy: req.user._id,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            },
        };

        const blog = await Blog.create(blogData);
        res.status(201).json({ message: "Blog created successfully", blog });

    } catch (error) {
        console.error(" Blog Creation Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
    

export const getAllBlogs = async(req,res)=> {
    const allBlogs=await Blog.find()
    res.status(200).json(allBlogs)
};

export const myBlogs = async (req, res) => {
    console.log("User in myBlogs:", req.user);  // Debugging log

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const createdBy = req.user._id;
    console.log("Fetching blogs for user ID:", createdBy); // Debugging log

    try {
        const myBlogs = await Blog.find({ createdBy });
        console.log("Fetched Blogs:", myBlogs); // Debugging log

        if (!myBlogs || myBlogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }

        res.status(200).json(myBlogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



export const updateBlog= async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "Invalid Blog id"});
    }
    const updatedblog = await Blog.findByIdAndUpdate(id, req.body, { new:true });
    if(!updatedblog){
        return res.status(404).json({ message: "Blog not found"});
    }
    res.status(200).json(updatedblog);
}


//like a blog
export const likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const userId = req.user._id.toString(); // Ensure it's a string

        if (blog.likes.includes(userId)) {
            blog.likes = blog.likes.filter((like) => like.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();

        res.status(200).json({ likes: blog.likes.length }); //  Return only count, not full object
    } catch (error) {
        console.error("Like Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get Blogs by a Single Creator
export const getBlogsByCreator = async (req, res) => {
    try {
        const { creatorId } = req.params;

        // ✅ Fetch blogs only if they exist
        const blogs = await Blog.find({ createdBy: creatorId }).populate("createdBy", "name email photo");
        
        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found for this creator." });
        }

        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching creator blogs:", error);
        res.status(500).json({ message: "Failed to fetch creator's blogs" });
    }
};

export const getLatestBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest blogs", error });
    }
  };


export const deleteBlog =  async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
};


export const getCategory = async (req, res) => {
  try {
    const category = req.params.category;
    console.log("Requested Category:", category);
    const blogs = await Blog.find({
      category: { $regex: new RegExp(`^${category}$`, "i") }
    });
    console.log("Fetched Blogs:", blogs);
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found in this category" });
    }
    res.json(blogs);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Error fetching blogs by category", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog" });
  }
};


