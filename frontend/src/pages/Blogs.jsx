import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs");
        setBlogs(data);

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((blog) => blog.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="container mx-auto px-6 py-10 bg-white dark:bg-gray-900 transition duration-300">
      {/* Category Filter (Tabs) */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition duration-300
            ${
              selectedCategory === category
                ? "bg-green-700 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link to={`/blog/${blog._id}`} key={blog._id} className="group">
              <motion.div
                className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.03 }}
              >
                {/* Blog Image with Overlay */}
                <div className="relative w-full h-56">
                  <img
                    src={blog.blogImage?.url || "https://via.placeholder.com/300"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
                  />
                  {/* Read More Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-md text-lg font-semibold">
                      Read More
                    </span>
                  </motion.div>
                </div>

                {/* Blog Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                    {blog.about?.slice(0, 100) || "No description"}...
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.createdAt).toDateString()}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center col-span-3">
            No blogs found.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Blogs;
