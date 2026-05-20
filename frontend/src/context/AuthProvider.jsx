
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState();

    // Check login status on page load and refetch user data on authentication change
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("http://localhost:4001/api/users/check", {
                withCredentials: true,
            });
            setUser(data.user);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();

        const fetchProfile = async () => {

            try {
                const token = Cookies.get("token");
                const parsedToken = token?JSON.parse(token):undefined;
            if(parsedToken){
                const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {
                    withCredentials: true,
                   headers: { "Content-Type": "application/json" },
               });
                   console.log(data);
                   setProfile(data);
                   //setIsAuthenticated(true);
            }
            } catch (error) {
            console.log(error);
            }};

        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", {
                    withCredentials: true,
                });
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();
        fetchProfile();
    }, []);

    let navigate = useNavigate();
    // Logout function
    const logout = async () => {
        try {
            await axios.post("http://localhost:4001/api/users/logout", {}, { withCredentials: true });
            setUser(null);
            toast.success("Logout successful!");
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ user, setUser, logout, blogs , profile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
