import express from "express";
import {
    getMyProfile,
    login,
    logout,
    register,
    updateProfile,
    getCreators,
    getUserById,
    followUser,
    getFollowers,
    getFollowing
} from "../controller/user.controller.js";
import { isAuthentication } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthentication, logout);
router.get("/my-profile", isAuthentication, getMyProfile);
router.get("/creators", getCreators);
router.put("/update-profile", isAuthentication, updateProfile);
router.get("/check", isAuthentication, (req, res) => {
    res.json({ user: req.user }); // Send user if authenticated
});
router.get("/:id", getUserById); // Route to fetch user by ID

// Follow and Unfollow User
router.put("/follow/:id", isAuthentication, followUser);

// Get Followers and Following
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

export default router;
