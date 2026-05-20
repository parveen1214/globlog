import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";
import { LiaAdjustSolid } from "react-icons/lia"; // New icon for dark mode toggle

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="relative shadow-lg px-6 py-3 bg-lime-300 dark:bg-gray-950 transition duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-black dark:text-white flex-1">
          Glo<span className="text-green-700 dark:text-green-700 font-semibold">Blog</span>
        </Link>
        <div className="flex-1">
          <ul className="flex justify-center space-x-11 font-bold text-lg text-black dark:text-white">
            <Link to="/" className="hover:text-green-700 dark:hover:text-lime-400 duration-200">HOME</Link>
            <Link to="/blogs" className="hover:text-green-700 dark:hover:text-lime-400 duration-200">BLOGS</Link>
            <Link to="/creators" className="hover:text-green-700 dark:hover:text-lime-400 duration-200">CREATORS</Link>
            <Link to="/about" className="hover:text-green-700 dark:hover:text-lime-400 duration-200">ABOUT</Link>
            <Link to="/contact" className="hover:text-green-700 dark:hover:text-lime-400 duration-200">CONTACT</Link>
          </ul>
        </div>
        <div className="flex-1 flex justify-end space-x-3 items-center">
          {user && <Link to="/dashboard" className="bg-slate-700 text-white font-semibold hover:bg-slate-950 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 px-4 py-2 rounded-md">DASHBOARD</Link>}
          {user ? (
            <button onClick={logout} className="bg-red-800 text-white font-semibold hover:bg-red-950 dark:bg-red-700 dark:hover:bg-red-600 duration-300 px-4 py-2 rounded-md">LOGOUT</button>
          ) : (
            <Link to="/login" className="bg-slate-700 text-white font-semibold hover:bg-slate-950 dark:bg-gray-700 dark:hover:bg-gray-600 duration-300 px-4 py-2 rounded-md">LOGIN</Link>
          )}
        </div>
      </div>

      {/* Dark Mode Toggle Button (Top Right) */}
      <button 
        onClick={toggleTheme} 
        className="absolute top-3 right-5 p-2 rounded-full text-black dark:text-white bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        <LiaAdjustSolid size={24} />
      </button>
    </nav>
  );
}

export default Navbar;
