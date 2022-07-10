import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name: {
      type:String,
      unique:true
    },

    price: Number,

    category: String
})


const Product = mongoose.model("Product",productSchema)
export {Product}