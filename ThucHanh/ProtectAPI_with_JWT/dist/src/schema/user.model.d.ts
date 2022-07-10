import mongoose from "mongoose";
declare const User: mongoose.Model<{
    password?: string;
    username?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    password?: string;
    username?: string;
}>>;
export { User };
