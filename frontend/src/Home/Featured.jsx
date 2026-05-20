// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthProvider"; // Import Auth Context

// const FeaturedBlogs = () => {
//   const { blogs } = useAuth(); // Get blogs from context

//   // Filter only featured blogs
//   const featuredBlogs = blogs?.filter((blog) => blog.category==="Technology");

//   return (
//     <section className="pt-12 pb-0 bg-gray-100 dark:bg-gray-900 transition duration-300">
//       <div className="container mx-auto px-6">
//         {/* Title with vertical green bar */}
//         <div className="border-l-8 border-green-700 dark:border-lime-400 pl-4 mb-6">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Featured Blogs
//           </h2>
//         </div>

//         {/* Blog Cards Grid */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {featuredBlogs.length > 0 ? (
//             featuredBlogs.map((blog) => (
//               <Link to={`/blog/${blog._id}`} key={blog._id} className="group">
//                 <motion.div
//                   className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition duration-300"
//                   whileHover={{ scale: 1.03 }}
//                 >
//                   {/* Blog Image */}
//                   <div className="relative w-full h-56">
//                     <img
//                       src={blog.blogImage?.url}
//                       alt={blog.title}
//                       className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
//                     />
//                     {/* Read More Overlay */}
//                     <motion.div
//                       className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     >
//                       <span className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-md text-lg font-semibold">
//                         Read More
//                       </span>
//                     </motion.div>
//                   </div>

//                   {/* Blog Info */}
//                   <div className="p-5 flex flex-col flex-grow">
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       {blog.title}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
//                       {blog.about.slice(0, 100)}...
//                     </p>
//                     <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
//                       {new Date(blog.createdAt).toDateString()}
//                     </p>
//                   </div>
//                 </motion.div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 dark:text-gray-400">
//               No featured blogs yet.
//             </p>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedBlogs;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const FeaturedBlogs = () => {
  const { blogs } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Filter only featured blogs
  const featuredBlogs = blogs?.filter((blog) => blog.category === "Technology");

  const nextSlide = () => {
    if (currentIndex < Math.ceil(featuredBlogs?.length / 3) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate visible blogs
  const visibleBlogs = featuredBlogs?.slice(currentIndex * 3, (currentIndex * 3) + 3);

  return (
    <section className="pt-12 pb-0 bg-gray-100 dark:bg-gray-900 transition duration-300 relative">
      <div className="container mx-auto px-6">
        {/* Title with vertical green bar */}
        <div className="border-l-8 border-green-700 dark:border-lime-400 pl-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Featured Blogs
          </h2>
        </div>

        {/* Slider container */}
        <div className="relative overflow-hidden">
          {/* Navigation arrows */}
          {featuredBlogs?.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                <FiChevronLeft className="text-gray-800 dark:text-white text-xl" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= Math.ceil(featuredBlogs.length / 3) - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                <FiChevronRight className="text-gray-800 dark:text-white text-xl" />
              </button>
            </>
          )}

          {/* Slider track */}
          <motion.div
            ref={sliderRef}
            className="overflow-hidden"
          >
            <motion.div
              className="flex gap-8"
              animate={{ 
                x: -currentIndex * 100 + '%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {featuredBlogs?.length > 0 ? (
                featuredBlogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    className="flex-shrink-0 w-[calc(33.333%-1.5rem)]" // 3 cards per view
                  >
                    <Link to={`/blog/${blog._id}`} className="group block">
                      <motion.div
                        className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition duration-300"
                        whileHover={{ scale: 1.03 }}
                      >
                        {/* Blog Image */}
                        <div className="relative w-full h-56">
                          <img
                            src={blog.blogImage?.url}
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
                  </motion.div>
                ))
              ) : (
                <div className="w-full text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No featured blogs yet.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;