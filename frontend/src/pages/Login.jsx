import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { theme } = useTheme(); // Get current theme

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:4001/api/users/login", { email, password }, { withCredentials: true });
      setUser(data.user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid credentials or server error");
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-stone-100"}`}>
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-sm relative transition-all duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="flex justify-center mb-3">
          <h1 className="text-3xl font-bold">
            Glo<span className="text-green-700 font-semibold">Blog</span>
          </h1>
        </div>
        <h2 className="text-xl font-bold mb-2">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-green-800 transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-green-800 transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full mt-3 py-1.5 bg-lime-300 text-black font-medium rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300">
            Login
          </button>
        </form>
        <p className="text-xs text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
