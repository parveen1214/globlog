import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from 'cors'

import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import contactRoute from "./routes/contact.route.js"
import commentRoute from "./routes/comment.route.js";

const app = express()
dotenv.config()

const port = process.env.PORT
const MONGO_URL=process.env.MONGO_URL

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

//middleware
app.use(express.json());
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, "");
    const isAllowedOrigin = allowedOrigins.includes(normalizedOrigin);
    const isLocalDevOrigin = /^http:\/\/localhost:\d+$/.test(normalizedOrigin);
    if (isAllowedOrigin || isLocalDevOrigin) {
      return callback(null, origin);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))

try {
  mongoose.connect(MONGO_URL)
  console.log("Connected to mongodb!")
} catch (error) {
  console.log(error)
}

 app.use("/api/users", userRoute);
 app.use("/api/blogs", blogRoute);
 app.use("/api/contact", contactRoute);
 app.use("/api/comments", commentRoute);

 cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

app.get('/', (req, res) => {
  res.send('Hello parveen!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
