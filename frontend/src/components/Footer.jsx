import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-yellow-100 dark:bg-gray-950 text-black dark:text-white py-12 transition duration-300">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Brand Section */}
        <div>
          <h1 className="text-4xl font-extrabold">
            Glo<span className="text-green-700 dark:text-green-700">Blog</span>
          </h1>
          <p className="text-black dark:text-gray-300 mt-3">
            Your platform for creative blogging, where ideas and stories come to life.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-extrabold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="text-black dark:text-gray-300 hover:text-green-700 dark:hover:text-lime-400">Home</Link></li>
            <li><Link to="/blogs" className="text-black dark:text-gray-300 hover:text-green-700 dark:hover:text-lime-400">Blogs</Link></li>
            <li><Link to="/about" className="text-black dark:text-gray-300 hover:text-green-700 dark:hover:text-lime-400">About</Link></li>
            <li><Link to="/contact" className="text-black dark:text-gray-300 hover:text-green-700 dark:hover:text-lime-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-extrabold">Contact Us</h3>
          <p className="text-black dark:text-gray-300 mt-2">Email: armaan04.v@gmail.com</p>
          <p className="text-black dark:text-gray-300">Phone: +91 1234876590</p>
          <p className="text-black dark:text-gray-300">Location: Chandigarh, India</p>
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div className="mt-10 border-t border-black dark:border-gray-600 pt-6 text-center text-black dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} GloBlog. <br />
        Site Built With ❤️ By GloBlog team
      </div>
    </footer>
  );
};

export default Footer;
