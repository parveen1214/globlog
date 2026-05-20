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

//middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow frontend origin
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  
}));

app.use(express.urlencoded({ extended: true })); // Fix missing form-data parsing
app.use(cookieParser());



app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))

// DB CODE
try {
  mongoose.connect(MONGO_URL)
  console.log("Connected to mongodb!")
} catch (error) {
  console.log(error)
}

 // defining routes
 app.use("/api/users", userRoute);
 app.use("/api/blogs", blogRoute);
 app.use("/api/contact", contactRoute);
 app.use("/api/comments", commentRoute);
 


 // cloudinary

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