import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import { motion } from "framer-motion";

const Creators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await api.get("/api/users/creators");
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-5xl font-extrabold mb-6 text-center">Our Creators</h2>
      {creators.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {creators.map((creator) => (
            <motion.div 
              key={creator._id} 
              className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg p-4 flex flex-col items-center hover:shadow-lg dark:hover:shadow-gray-600 transition"
              whileHover={{ scale: 1.05 }}
              variants={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/creator-blogs/${creator._id}`} className="text-center flex flex-col items-center">
                <img
                  src={creator.photo?.url || "/default-avatar.png"}
                  alt={creator.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                />
                <h3 className="text-lg font-semibold mt-2">{creator.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                  {creator.about || "No bio available"}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">No creators found.</p>
      )}
    </motion.div>
  );
};

export default Creators;
