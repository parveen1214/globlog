
import api, { clearAuthToken } from '../api.js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState();

    const checkAuth = async () => {
        try {
            const { data } = await api.get("/api/users/check");
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
                const parsedToken = token ? JSON.parse(token) : undefined;
                if (parsedToken) {
                    const { data } = await api.get("/api/users/my-profile", {
                        headers: { "Content-Type": "application/json" },
                    });
                    setProfile(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchBlogs = async () => {
            try {
                const { data } = await api.get("/api/blogs/all-blogs");
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();
        fetchProfile();
    }, []);

    let navigate = useNavigate();
    const logout = async () => {
        try {
            await api.post("/api/users/logout", {});
            clearAuthToken();
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
