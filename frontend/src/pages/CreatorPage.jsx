import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const CreatorPage = () => {
  const { creatorId } = useParams(); // Get creator's ID from URL params
  const { user } = useContext(AuthContext); // Get logged-in user from context
  const [creator, setCreator] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/users/${creatorId}`);
        setCreator(data);
        setFollowers(data.followers);
        setFollowing(data.following);

        if (user && data.followers.some((follower) => follower._id === user._id)) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error("Error fetching creator profile:", error);
      }
    };

    const fetchCreatorBlogs = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/blogs/creator-blogs/${creatorId}`);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching creator's blogs:", error);
      }
    };

    fetchCreatorData();
    fetchCreatorBlogs();
  }, [creatorId, user]);

  const handleFollowToggle = async () => {
    try {
      await axios.put(`http://localhost:4001/api/users/follow/${creatorId}`, {}, { withCredentials: true });

      if (isFollowing) {
        setFollowers((prev) => prev.filter((f) => f._id !== user._id));
      } else {
        setFollowers((prev) => [...prev, { _id: user._id, name: user.name, photo: user.photo }]);
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  if (!creator) return <div className="text-center py-10 dark:text-gray-300">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-72 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col border-r border-gray-300 dark:border-gray-700"
      >
        <div className="flex flex-col items-center text-center">
          <img src={creator.photo?.url} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600" />
          <h2 className="mt-4 text-xl font-semibold dark:text-white">{creator.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{creator.about}</p>

          {/* Follow/Unfollow Button (Hidden if the user is viewing their own profile) */}
          {user && user._id !== creator._id && (
            <button
              onClick={handleFollowToggle}
              className={`mt-4 px-6 py-2 rounded-md text-sm font-semibold transition ${
                isFollowing
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}

          {/* Followers & Following */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold dark:text-white">{followers.length}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold dark:text-white">{following.length}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
            </div>
          </div>

          {/* Total Blogs Count */}
          <div className="mt-4 bg-green-100 dark:bg-green-700 text-green-700 dark:text-white px-4 py-2 rounded-md text-sm font-semibold">
            Total Blogs: {blogs.length}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8 overflow-auto"
      >
        <div className="border-l-8 border-green-700 pl-4 mb-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{creator.name}'s Blogs</h2>
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
                {/* Blog Content with Date at Bottom */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold dark:text-white">{blog.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{blog.about.slice(0, 100)}...</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No blogs found.</p>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default CreatorPage;
