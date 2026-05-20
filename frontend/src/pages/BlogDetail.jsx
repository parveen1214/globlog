import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/blogs/${id}`);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    const fetchLatestBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/latest");
         // Filter out the current blog
      const filtered = data.filter((b) => b._id !== id);
      setLatestBlogs(filtered);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchBlog();
    fetchLatestBlogs();
  }, [id]);

  if (!blog) {
    return <p className="text-center text-gray-600 dark:text-gray-300 text-2xl">Loading blog...</p>;
  }

  // Like/Unlike Blog
  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a blog.");
      return;
    }

    try {
      await axios.put(`http://localhost:4001/api/blogs/like/${id}`, {}, { withCredentials: true });

      setBlog((prev) => ({
        ...prev,
        likes: prev.likes.includes(user._id)
          ? prev.likes.filter((like) => like !== user._id)
          : [...prev.likes, user._id],
      }));
    } catch (error) {
      toast.error("Error updating like.");
    }
  };

  // Navigate to another blog and reload the page
  const handleLatestBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
    window.location.reload(); // Force page reload
  };

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Left Section: Blog Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
      >
        {/* Blog Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{blog.title}</h1>

        {/* Author Section */}
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src={blog.adminPhoto || "https://via.placeholder.com/50"}
            alt={blog.adminName}
            className="w-16 h-16 rounded-full object-cover border-2 border-green-600 shadow-md"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{blog.adminName || "Unknown Author"}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xl">Published on {new Date(blog.createdAt).toDateString()}</p>
          </div>
        </div>

        {/* Blog Image */}
        {blog.blogImage?.url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <img
              src={blog.blogImage.url}
              alt={blog.title}
              className="w-full max-h-[500px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 prose prose-img:mx-auto prose-img:max-w-full prose-p:break-words max-w-full w-full text-gray-800 dark:text-gray-300 leading-relaxed overflow-hidden"
          style={{ fontSize: "1.2rem" }}
          dangerouslySetInnerHTML={{
            __html: blog.content
              .replace(/<h1>/g, '<h1 class="text-4xl font-extrabold my-6 dark:text-white">')
              .replace(/<h2>/g, '<h2 class="text-3xl font-bold my-5 dark:text-gray-200">')
              .replace(/<h3>/g, '<h3 class="text-2xl font-semibold my-4 dark:text-gray-300">')
              .replace(/<p>/g, '<p class="text-lg my-4 dark:text-gray-400">'),
          }}
        />

        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="mt-8 flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300"
        >
          {blog.likes.includes(user?._id) ? <FaHeart className="text-white animate-pulse" /> : <FaRegHeart className="text-white" />}
          <span className="font-medium">{blog.likes.length} Likes</span>
        </motion.button>

        
        {/* Comment Section */}
        <div className="mt-10 pt-6 border-t">
          {user ? (
            <CommentSection blogId={id} />
          ) : (
            <p className="text-lg text-green-700 dark:text-lime-400">
              <Link to="/login" className="hover:underline">
                Please log in to see and post comments.
              </Link>
            </p>
          )}
        </div>
      </motion.div>
{/* Right Section: Latest Blogs */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="hidden md:block"
>
  <div className="relative">
    {/* Green Vertical Line */}
    <div className="absolute left-0 top-0 h-full w-1 bg-green-600"></div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pl-4">
      Explore Latest Blogs
    </h2>
  </div>

  <div className="space-y-6 pl-4">
    {latestBlogs.map((latest) => (
      <motion.div
        key={latest._id}
        whileHover={{ scale: 1.02 }}
        className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 group"
        onClick={() => handleLatestBlogClick(latest._id)}
      >
        {/* Blog Image */}
        <div className="relative w-full h-44 overflow-hidden">
          <img
            src={latest.blogImage?.url}
            alt={latest.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Read More Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
            Read More
          </span>
        </div>

        {/* Blog Title & Date */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-1">
            {latest.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {new Date(latest.createdAt).toDateString()}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

    </div>
  );
};

export default BlogDetail;
