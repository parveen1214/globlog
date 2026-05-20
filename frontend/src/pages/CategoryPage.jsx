import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/category/${category}`
        );
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogsByCategory();
  }, [category]);

  return (
    <div className="container mx-auto px-6 py-8 bg-white dark:bg-gray-900 transition duration-300">
      {/* Title with vertical green bar */}
      <div className="border-l-8 border-green-700 pl-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {category} Blogs
        </h2>
      </div>

      {/* Blog Cards Grid with Motion Effects */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link to={`/blog/${blog._id}`} key={blog._id} className="group">
              <motion.div
                className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.03 }}
              >
                {/* Blog Image */}
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
                    {blog.about.slice(0, 100)}...
                  </p>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.createdAt).toDateString()}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            No blogs found in this category.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;
