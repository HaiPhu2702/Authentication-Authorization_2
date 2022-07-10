import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
     },
    password:String,
    googleID:String
})


const User = mongoose.model("User",userSchema)
export {User}