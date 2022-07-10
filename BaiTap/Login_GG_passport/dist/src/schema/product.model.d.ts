import mongoose from "mongoose";
declare const Product: mongoose.Model<{
    name?: string;
    price?: number;
    category?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    name?: string;
    price?: number;
    category?: string;
}>>;
export { Product };
