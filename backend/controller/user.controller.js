// import { User } from "../models/user.model.js";
// import { v2 as cloudinary } from 'cloudinary';
// import bcrypt from 'bcryptjs';
// import createTokenAndSaveCookies from "../jwt/AuthToken.js";
// import { Blog } from "../models/blog.model.js";

// export const register = async (req, res) => {
//     try {
//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }
//         const { photo } = req.files;
//         const allowedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
//         if (!allowedFormats.includes(photo.mimetype)) {
//             return res.status(400).json({ message: "Invalid file format. Only jpg, jpeg, webp, and png are allowed" });
//         }
        
//         const { email, name, password, phone, education } = req.body;
//         if (!email || !name || !password || !phone || !education || !photo) {
//             return res.status(400).json({ message: "All fields must be filled!" });
//         }
        
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: "This email already exists." });
//         }
        
//         const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
        
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         const newUser = new User({
//             email,
//             name,
//             password: hashedPassword,
//             phone,
//             education,
//             photo: {
//                 public_id: cloudinaryResponse.public_id,
//                 url: cloudinaryResponse.url
//             }
//         });
//         await newUser.save();
        
//         if (newUser) {
//             const token = await createTokenAndSaveCookies(newUser._id, res);
//             res.status(201).json({ message: "User registered successfully", newUser, token });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
        
//         const user = await User.findOne({ email }).select("+password");
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
        
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }
        
//         const token = await createTokenAndSaveCookies(user._id, res);
//         res.status(200).json({ message: "User logged in successfully", user, token });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// export const logout = (req, res) => {
//     try {
//         res.clearCookie("jwt", { httpOnly: true });
//         res.status(200).json({ message: "User logged out successfully." });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const getMyProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// export const getUserById = async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id).select("-password"); // Exclude password
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
// // GET CREATORS
// export const getCreators = async (req, res) => {
//     try {
//         // Find unique users who have posted at least one blog
//         const creators = await Blog.find().populate("createdBy", "name  photo  about");

//         // Extract unique users from blogs
//         const uniqueCreators = [];
//         const seenUsers = new Set();

//         creators.forEach((blog) => {
//             if (blog.createdBy && !seenUsers.has(blog.createdBy._id.toString())) {
//                 seenUsers.add(blog.createdBy._id.toString());
//                 uniqueCreators.push(blog.createdBy);
//             }
//         });

//         res.status(200).json(uniqueCreators);
//     } catch (error) {
//         console.error("Error fetching creators:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // EDIT USER PROFILE
// export const updateProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
        
//         const { name, phone, education, about } = req.body;
//         if (name) user.name = name;
//         if (phone) user.phone = phone;
//         if (education) user.education = education;
//         if (about) user.about = about;
        
//         if (req.files && req.files.photo) {
//             const { photo } = req.files;
//             const allowedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
//             if (!allowedFormats.includes(photo.mimetype)) {
//                 return res.status(400).json({ message: "Invalid file format. Only jpg, jpeg, webp, and png are allowed" });
//             }
            
//             if (user.photo.public_id) {
//                 await cloudinary.uploader.destroy(user.photo.public_id);
//             }
            
//             const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
//             user.photo = {
//                 public_id: cloudinaryResponse.public_id,
//                 url: cloudinaryResponse.url
//             };
//         }
        
//         await user.save();
//         res.status(200).json({ message: "Profile updated successfully", user });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";
import { Blog } from "../models/blog.model.js";

// REGISTER USER
export const register = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { photo } = req.files;
        const allowedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Invalid file format. Only jpg, jpeg, webp, and png are allowed" });
        }

        const { email, name, password, phone, education } = req.body;
        if (!email || !name || !password || !phone || !education || !photo) {
            return res.status(400).json({ message: "All fields must be filled!" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "This email already exists." });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            phone,
            education,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });

        await newUser.save();

        if (newUser) {
            const token = await createTokenAndSaveCookies(newUser._id, res);
            res.status(201).json({ message: "User registered successfully", newUser, token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await createTokenAndSaveCookies(user._id, res);
        res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// LOGOUT USER
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: process.env.COOKIE_SAME_SITE || "lax",
        });
        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET MY PROFILE
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("followers following", "name photo");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password").populate("followers following", "name photo");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// FOLLOW & UNFOLLOW USER
export const followUser = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = await User.findById(req.user._id);
        const targetUser = await User.findById(id);

        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (currentUser.following.includes(id)) {
            // UNFOLLOW
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            return res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            // FOLLOW
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            return res.status(200).json({ message: "Followed successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET FOLLOWERS
export const getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("followers", "name photo");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET FOLLOWING
export const getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("following", "name photo");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.following);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET CREATORS
export const getCreators = async (req, res) => {
    try {
        // Find unique users who have posted at least one blog
        const creators = await Blog.find().populate("createdBy", "name photo about");

        // Extract unique users from blogs
        const uniqueCreators = [];
        const seenUsers = new Set();

        creators.forEach((blog) => {
            if (blog.createdBy && !seenUsers.has(blog.createdBy._id.toString())) {
                seenUsers.add(blog.createdBy._id.toString());
                uniqueCreators.push(blog.createdBy);
            }
        });

        res.status(200).json(uniqueCreators);
    } catch (error) {
        console.error("Error fetching creators:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, phone, education, about } = req.body;
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (education) user.education = education;
        if (about) user.about = about;

        if (req.files && req.files.photo) {
            const { photo } = req.files;
            if (user.photo.public_id) {
                await cloudinary.uploader.destroy(user.photo.public_id);
            }

            const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
            user.photo = { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.url };
        }

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};