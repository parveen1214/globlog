import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"



const createTokenAndSaveCookies =async(userID,res)=>{
    const token=jwt.sign({userID},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
   res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
    });
    await User.findByIdAndUpdate(userID,{token})
    return token;
}
export default createTokenAndSaveCookies;

