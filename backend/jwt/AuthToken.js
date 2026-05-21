import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

const createTokenAndSaveCookies = async (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    });

    const cookieSecure = process.env.COOKIE_SECURE === "true";
    const cookieSameSite = process.env.COOKIE_SAME_SITE || "lax";

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: cookieSecure,
        sameSite: cookieSameSite,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await User.findByIdAndUpdate(userID, { token });
    return token;
};

export default createTokenAndSaveCookies;
