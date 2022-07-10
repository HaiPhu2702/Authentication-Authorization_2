import mongoose from "mongoose";
declare const Product: mongoose.Model<{
    price?: number;
    category?: string;
    name?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    price?: number;
    category?: string;
    name?: string;
}>>;
export { Product };
