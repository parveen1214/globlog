import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../api.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/api/contact/submit", formData);
      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        toast.error("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }} 
      className="container mx-auto px-6 py-12 bg-white dark:bg-gray-900 transition duration-300"
    >
      <Toaster />
      
      {/* Title */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-l-8 border-green-700 pl-4 mb-8"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Contact Us
        </h1>
      </motion.div>

      {/* Contact Info & Form Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Have questions or feedback? Reach out to us, and we’ll get back to you as soon as possible.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">armaan04.v@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">+91 1234876590</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Location</h3>
            <p className="text-gray-600 dark:text-gray-400">Chandigarh, India</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-2 rounded-md hover:bg-green-800 transition duration-300"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;
