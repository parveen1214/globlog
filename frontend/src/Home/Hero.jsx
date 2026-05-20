// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthProvider"; // Import Auth Context

// const Hero = () => {
//   const { user } = useAuth(); // Get user from context
//   const navigate = useNavigate(); // For navigation

//   const handleStartWriting = () => {
//     if (user) {
//       navigate("/create-blog"); // Redirect to create blog if logged in
//     } else {
//       navigate("/login"); // Redirect to login if not logged in
//     }
//   };

//   return (
//     <motion.section 
//       className="relative bg-yellow-100 text-black py-24 px-6 text-center shadow-lg"
//       initial={{ opacity: 0, y: 30 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       transition={{ duration: 0.8, ease: "easeOut" }}
//     >
    
//       {/* Content */}
//       <div className="relative z-10 max-w-3xl mx-auto">
//         <motion.h1 
//           className="text-4xl md:text-6xl font-bold"
//           initial={{ y: -20, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           Welcome to Glo<span className="text-green-700 font-semibold">Blog</span>
//         </motion.h1>

//         <motion.p 
//           className="mt-4 text-lg md:text-xl text-gray-900 font-semibold"
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ delay: 0.5, duration: 0.6 }}
//         >
//           Share your thoughts, write amazing blogs, and connect with the world.
//         </motion.p>

//         {/* Call to Action (CTA) Buttons */}
//         <div className="mt-6 flex justify-center gap-4">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }} 
//             animate={{ scale: 1, opacity: 1 }} 
//             transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 120 }}
//           >
//             <button
//               onClick={() => navigate("/blogs")}
//               className="bg-slate-700 text-white font-semibold hover:bg-slate-950 duration-300 px-6 py-3 rounded-md"
//             >
//               Explore Blogs
//             </button>
//           </motion.div>

//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }} 
//             animate={{ scale: 1, opacity: 1 }} 
//             transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 120 }}
//           >
//             <button 
//               onClick={handleStartWriting}
//               className="bg-green-700 text-white font-semibold hover:bg-green-900 duration-300 px-6 py-3 rounded-md"
//             >
//               {user ? "Start Writing" : "Login to Write"}
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default Hero;
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider"; // Import Auth Context

const Hero = () => {
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate(); // For navigation

  const handleStartWriting = () => {
    if (user) {
      navigate("/create-blog"); // Redirect to create blog if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <motion.section 
      className="relative bg-yellow-100 dark:bg-gray-800 text-black dark:text-white py-24 px-6 text-center shadow-lg transition duration-300"
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
    
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold"
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to Glo<span className="text-green-700 dark:text-green-700 font-semibold">Blog</span>
        </motion.h1>

        <motion.p 
          className="mt-4 text-lg md:text-xl text-gray-900 dark:text-gray-300 font-semibold"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Share your thoughts, write amazing blogs, and connect with the world.
        </motion.p>

        {/* Call to Action (CTA) Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <button
              onClick={() => navigate("/blogs")}
              className="bg-slate-700 dark:bg-gray-700 text-white font-semibold hover:bg-slate-950 dark:hover:bg-gray-600 transition duration-300 px-6 py-3 rounded-md"
            >
              Explore Blogs
            </button>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <button 
              onClick={handleStartWriting}
              className="bg-green-700 dark:bg-lime-600 text-white font-semibold hover:bg-green-900 dark:hover:bg-lime-500 transition duration-300 px-6 py-3 rounded-md"
            >
              {user ? "Start Writing" : "Login to Write"}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
