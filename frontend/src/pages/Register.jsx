import React, { useState } from "react";
import { Link } from "react-router-dom";
import api, { setAuthToken } from "../api.js";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState(null);
  const { theme } = useTheme(); // Get current theme

  const changePhotoHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await api.post("/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.token) setAuthToken(data.token);
      toast.success("Registration successful!");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setEducation("");
      setPhoto(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-stone-100"}`}>
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-sm transition-all duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="flex justify-center mb-3">
          <h1 className="text-3xl font-bold">
            Glo<span className="text-green-700 font-semibold">Blog</span>
          </h1>
        </div>

        <h2 className="text-xl font-bold mb-2">Register</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label className="block font-medium">Your Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-green-800 transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

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
            <label className="block font-medium">Phone Number</label>
            <input 
              type="tel" 
              placeholder="Enter your number" 
              className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-green-800 transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
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

          <div className="mb-2">
            <label className="block font-medium">Select Education</label>
            <select 
              className={`w-full px-3 py-1.5 border rounded-md transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              value={education} 
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="">Select your education</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's</option>
              <option value="master">Master's</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block font-medium">Upload Profile Picture</label>
            <input 
              type="file" 
              className={`w-full border rounded-md p-1 transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} 
              onChange={changePhotoHandler} 
            />
          </div>

          <p className="text-xs text-center mt-2">
            Already registered? <Link to="/login" className="text-green-700 hover:underline">Login now</Link>
          </p>

          <button type="submit" className="w-full mt-3 py-1.5 bg-lime-300 text-black font-medium rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
