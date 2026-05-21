import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api.js";
import { useAuth } from "../context/AuthProvider";
import { FiEdit, FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [editableUser, setEditableUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ name: "", about: "" });
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get("/api/users/my-profile");

        setUser(data);
        setEditableUser(data);
        setEditedData({ name: data.name, about: data.about });

        // Store follower and following count
        setFollowers(data.followers.length);
        setFollowing(data.following.length);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserBlogs = async () => {
      try {
        const { data } = await api.get("/api/blogs/my-blog");
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    fetchUserData();
    fetchUserBlogs();
  }, []);

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("about", editedData.about);
      if (photo) {
        formData.append("photo", photo);
      }

      const { data } = await api.put("/api/users/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/blogs/delete/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
      toast.success("Blog deleted successfully!");
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-72 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col border-r dark:border-gray-700"
      >
        <div className="flex flex-col items-center text-center relative">
          {editableUser && !isEditing ? (
            <>
              <img
                src={editableUser.photo?.url}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <FiEdit
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 cursor-pointer"
                size={20}
                onClick={() => setIsEditing(true)}
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-200">
                {editableUser.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {editableUser.about}
              </p>

              {/* Follower & Following Count */}
              <div className="mt-4 flex gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {followers}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {following}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Following</p>
                </div>
              </div>

              {/* Total Blogs Count */}
              <div className="mt-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-md text-sm font-semibold">
                Total Blogs: {blogs.length}
              </div>
            </>
          ) : (
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                className="border p-2 mb-2 rounded bg-gray-200 text-gray-600 border-black dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
              <textarea
                value={editedData.about}
                onChange={(e) => setEditedData({ ...editedData, about: e.target.value })}
                className="border p-2 mb-2 rounded bg-gray-200 text-gray-600 border-black dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
              <input
                type="file"
                onChange={handlePhotoChange}
                className="border p-2 mb-2 rounded bg-gray-200 text-gray-600 border-black dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
              <button
                className="bg-green-700 text-white px-4 py-2 rounded dark:bg-green-600"
                onClick={handleEditProfile}
              >
                Save
              </button>
              <button
                className="bg-slate-700 text-white px-4 py-2 rounded mt-2 dark:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8 overflow-auto dark:bg-gray-900 dark:text-gray-200"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
            Your Blogs
          </h2>
          <Link
            to="/create-blog"
            className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition dark:bg-green-600 dark:hover:bg-green-500"
          >
            Create New <FaPlus className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden group hover:shadow-xl transition flex flex-col min-h-[350px]"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative overflow-hidden">
                  <Link to={`/blog/${blog._id}`} className="block">
                    <img
                      src={blog.blogImage?.url}
                      alt={blog.title}
                      className="w-full h-44 object-cover transition-all duration-300 group-hover:brightness-50"
                    />
                    {/* Read More Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-md">
                        Read More
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {blog.about.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 mt-auto">
                  <Link to={`/update/${blog._id}`} className="px-4 py-2 bg-green-700 text-white rounded-md">
                    Edit
                  </Link>
                  <button
                    onClick={() => { setSelectedBlog(blog._id); setIsDeleting(true); }}
                    className="px-4 py-2 bg-red-800 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No blogs found.</p>
          )}
        </div>
      </motion.main>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
            <FiX
              size={20}
              className="absolute top-3 right-3 cursor-pointer text-gray-600 dark:text-gray-300"
              onClick={() => setIsDeleting(false)}
            />
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
              Are you sure you want to delete this blog?
            </h2>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md text-gray-900 dark:text-gray-200"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-950 transition dark:bg-red-700 dark:hover:bg-red-600"
                onClick={() => handleDelete(selectedBlog)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;