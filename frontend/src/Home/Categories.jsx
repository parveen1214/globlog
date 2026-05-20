// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   // Fetch blog categories from the database
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs"); // Adjust API if needed
//         const uniqueCategories = [...new Set(data.map((blog) => blog.category))]; // Remove duplicates
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <section className="py-8 bg-gray-100 dark:bg-gray-900 transition duration-300">
//       <div className="container mx-auto px-6">
//         {/* Title with vertical green bar */}
//         <div className="border-l-8 border-green-700 dark:border-lime-400 pl-4 mb-6">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h2>
//         </div>

//         {/* Fixed 3-column grid */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {categories.length > 0 ? (
//             categories.map((category, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 className="relative group rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition duration-300"
//               >
//                 <Link to={`/category/${category}`}>
//                   <img
//                     src={`/images/${category.toLowerCase()}.jpg`} // Ensure images match category names
//                     alt={category}
//                     className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-75"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <h3 className="text-white text-xl font-bold">{category}</h3>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 dark:text-gray-400">No categories found.</p>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Categories;

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const sliderRef = useRef(null);

  // Fetch blog categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs");
        const uniqueCategories = [...new Set(data.map((blog) => blog.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Calculate slider width
  useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, [categories]);

  const nextSlide = () => {
    if (currentIndex < categories.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate visible categories
  const visibleCategories = categories.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-8 bg-gray-100 dark:bg-gray-900 transition duration-300 relative">
      <div className="container mx-auto px-6">
        {/* Title with vertical green bar */}
        <div className="border-l-8 border-green-700 dark:border-lime-400 pl-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h2>
        </div>

        {/* Slider container */}
        <div className="relative overflow-hidden">
          {/* Navigation arrows */}
          {categories.length > 3 && (
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
                disabled={currentIndex >= categories.length - 3}
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
              className="flex gap-6"
              animate={{ 
                x: -currentIndex * (100 / 3) + '%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[calc(33.333%-1.5rem)]" // 3 cards per view
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative group rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition duration-300">
                      <Link to={`/category/${category}`}>
                        <img
                          src={`/images/${category.toLowerCase()}.jpg`}
                          alt={category}
                          className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-75"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <h3 className="text-white text-xl font-bold">{category}</h3>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 w-full">No categories found.</p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categories;