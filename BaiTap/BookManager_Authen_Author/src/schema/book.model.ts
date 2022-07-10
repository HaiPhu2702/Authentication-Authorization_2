import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    author:String,
    keyword:[{key:String}],
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    publisher:{type:mongoose.Schema.Types.ObjectId,ref:"Publisher"}
})

const Book=mongoose.model("Book",bookSchema)
export {Book}
