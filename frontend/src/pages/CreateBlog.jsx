import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const CreateBlog = () => {
  const navigate = useNavigate();
  
  const categories = ["Motorsports", "Lifestyle", "Animals", "Travel", "Food","Technology"];

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    imagePreview: "",
    category: "",
    about: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imagePreview: previewURL });
    }
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("blogImage", formData.image);  
      form.append("category", formData.category);
      form.append("about", formData.about);
      form.append("content", formData.content);

      await axios.post("http://localhost:4001/api/blogs/create-blog", form, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
      });

      toast.success("Blog created successfully!");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error creating blog:", error.response ? error.response.data : error.message);
      
      if (error.response) {
        const { data } = error.response;
        if (data?.message?.includes("Image is required")) {
          toast.error("Blog image is required");
        } else if (data?.message?.includes("Title is required")) {
          toast.error("Title cannot be empty");
        } else if (data?.message?.includes("Category is required")) {
          toast.error("Please select a category");
        } else if (data?.message?.includes("Content is required")) {
          toast.error("Blog content cannot be empty");
        } else {
          toast.error("Failed to create blog");
        }
      } else {
        toast.error("Something went wrong. Please try again");
      }

      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="mt-20 mb-20"
    >
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Create New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Title" 
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-green-500"
            required 
          />
          
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            required 
          />
          
          {formData.imagePreview && (
            <motion.img 
              src={formData.imagePreview} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          
          <input 
            type="text" 
            name="about" 
            value={formData.about} 
            onChange={handleChange} 
            placeholder="Short description" 
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            required 
          />
          
          <ReactQuill value={formData.content} onChange={handleContentChange} className="bg-white dark:bg-gray-800 dark:text-gray-200" required />
          
          <motion.button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
            }`}
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateBlog;
