import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthentication = async (req, res, next) => {
    try {
        console.log("Incoming Request:", req.method, req.originalUrl);
        console.log("Cookies in Request:", req.cookies); // Check if cookies exist

        let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];


        if (!token) {
            console.log("No token provided.");
            return res.status(401).json({ error: "User not authenticated." });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.userID);

            if (!req.user) {
                console.log("User not found.");
                return res.status(404).json({ error: "User not found" });
            }

            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Session expired. Please log in again." });
            } else {
                return res.status(401).json({ error: "Invalid token. Please log in again." });
            }
        }
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
