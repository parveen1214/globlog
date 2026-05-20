import mongoose from "mongoose";
import validator from "validator";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }, 
    education:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    token:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const User=mongoose.model("User",userSchema);