// import React from "react";
// import { motion } from "framer-motion";

// const About = () => {
//   return (
//     <div className="container mx-auto px-6 py-12 transition duration-300">
//       {/* Hero Section */}
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">About Us</h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
//           Welcome to GloBlog, a platform built for passionate writers, 
//           curious minds, and creative thinkers. We believe in the power of 
//           sharing stories, knowledge, and experiences to inspire and inform.
//         </p>
//       </motion.div>

//       {/* About Section */}
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         {/* Text Content */}
//         <motion.div
//           className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
//           <p>
//             At GloBlog, we strive to create a space where anyone can share their voice. 
//             Whether you're an expert in a field, a storyteller, or simply someone with 
//             a unique perspective, this is a place for you. Our goal is to make content 
//             accessible, engaging, and meaningful for readers across the world.
//           </p>
//           <p className="mt-4">
//             We value authenticity, creativity, and knowledge-sharing. Every blog post is 
//             an opportunity to connect, learn, and contribute to a broader conversation. 
//             We’re committed to providing a seamless and enjoyable reading and writing experience.
//           </p>
//         </motion.div>

//         {/* Big Company Logo */}
//         <motion.div
//           className="flex justify-center"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex justify-center items-center h-full">
//             <h1 className="text-9xl font-bold text-gray-900 dark:text-white">
//               Glo<span className="text-green-700 dark:text-green-700 font-semibold">Blog</span>
//             </h1>
//           </div>
//         </motion.div>
//       </div>

//       {/* Meet the Team Section */}
//       <div className="mt-16 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">The people behind GloBlog</p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
//           {["Armaan Verma", "Parveen Kumar", "Manjit Kumar Sharma"].map((name, index) => (
//             <motion.div
//               key={index}
//               className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg text-center text-xl font-semibold transition duration-300"
//               whileHover={{ scale: 1.05 }}
//             >
//               {name}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;


import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUsers, FaLightbulb, FaPenFancy } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition duration-300">
      {/* Hero Section (Lighter Gradient) */}
      <motion.div
        className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          About Glo<span className="text-green-700 dark:text-green-700 font-semibold">Blog</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Your space to <strong>express, share, and inspire</strong> through the power of words. Join a <strong>creative community</strong> of writers!
        </p>
      </motion.div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
  className="md:col-span-2 text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-center"

  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our <span className="text-green-700 dark:text-green-700 font-semibold">Mission</span></h2>
          <p>
            At GloBlog, we strive to create a space where anyone can share their voice. 
            Whether you're an expert in a field, a storyteller, or simply someone with 
            a unique perspective, this is a place for you.
          </p>
          <p className="mt-4">
            We value authenticity, creativity, and knowledge-sharing. Every blog post is 
            an opportunity to connect, learn, and contribute to a broader conversation. 
            We're committed to providing a seamless and enjoyable reading and writing experience.
          </p>
        </motion.div>


      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Why Choose Glo<span className="text-green-700 dark:text-green-700 font-semibold">Blog</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers className="text-black dark:text-white text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold dark:text-white">Growing Community</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Join thousands of writers and readers worldwide.</p>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            <FaLightbulb className="text-black dark:text-white text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold dark:text-white">Inspiration & Creativity</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Read and write blogs that inspire and educate.</p>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            <FaPenFancy className="text-black dark:text-white text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold dark:text-white">Write & Publish</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Easily create and share your blogs with the world.</p>
          </motion.div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="bg-gray-200 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The creative minds behind GloBlog</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Armaan Verma", "Parveen Kumar", "chat gpt"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center text-xl font-semibold transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-gray-900 dark:text-white">{name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;