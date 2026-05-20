import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";
import CategoryPage from "./pages/CategoryPage";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import CreatorPage from "./pages/CreatorPage";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/login", "/register"].includes(location.pathname);
  const { user, blogs } = useAuth();

  console.log(blogs);

  // ✅ Prevent flashing issue by ensuring authentication is loaded before rendering
  if (user === undefined) return null;

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        {!hideNavbarFooter && <Navbar />}

        <main className="flex-1">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/creators" element={<Creators />} />
            <Route path="/creator-blogs/:creatorId" element={<CreatorPage />} />
            <Route exact path="/category/:category" element={<CategoryPage />} />
            <Route exact path="/blog/:id" element={<BlogDetail />} />
            <Route exact path="/create-blog" element={<CreateBlog />} />
            <Route exact path="/update/:id" element={<UpdateBlog />} />
          </Routes>
        </main>

        {/* ✅ Updated Toaster Configuration */}
        <Toaster
          position="top-center" // Moves toast messages to top-center
          reverseOrder={false}
          toastOptions={{
            style: {
              background: document.documentElement.classList.contains("dark") ? "#333" : "white",
              color: document.documentElement.classList.contains("dark") ? "white" : "black",
            },
          }}
        />

        {!hideNavbarFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
