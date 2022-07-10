import mongoose from "mongoose";
declare const User: mongoose.Model<{
    password?: string;
    googleID?: string;
    username?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    password?: string;
    googleID?: string;
    username?: string;
}>>;
export { User };
