import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from URL params

  const categories = ["Motorsports", "Lifestyle", "Animals", "Travel", "Food", "Technology"];

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    about: "",
    content: "",
  });

  const [isLoaded, setIsLoaded] = useState(false); // Ensure re-render after fetching

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/blogs/${id}`);

        setFormData((prev) => ({
          title: data.title || prev.title,
          image: data.blogImage || prev.image,
          category: data.category || prev.category,
          about: data.about || prev.about,
          content: data.content || prev.content,
        }));

        setIsLoaded(true); // Ensure UI updates
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", formData.title);
      if (formData.image instanceof File) {
        form.append("blogImage", formData.image);
      }
      form.append("category", formData.category);
      form.append("about", formData.about);
      form.append("content", formData.content);

      await axios.put(`http://localhost:4001/api/blogs/update/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Fade in from below
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-md mt-6 mb-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Blog</h2>
      {isLoaded ? (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          {formData.image && !(formData.image instanceof File) && (
            <motion.img
              src={formData.image.url}
              alt="Current Blog"
              className="w-32 h-32 object-cover rounded-md border border-gray-300 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Short description"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          <div className="dark:bg-gray-800 dark:text-white">
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              className="bg-white dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="bg-green-700 dark:bg-green-600 text-white px-4 py-2 rounded transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Blog
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-700 dark:bg-gray-600 text-white px-4 py-2 rounded transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-900 dark:text-white"
        >
          Loading blog data...
        </motion.p>
      )}
    </motion.div>
  );
};

export default UpdateBlog;
