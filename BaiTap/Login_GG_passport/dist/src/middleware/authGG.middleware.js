"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_model_1 = require("../schema/user.model");
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: "262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
}, async function (request, accessToken, refreshToken, profile, done) {
    try {
        const user = await user_model_1.User.findOne({ "googleID": profile.id });
        if (!user) {
            const newUser = new user_model_1.User({
                username: profile.displayName,
                password: "123",
                googleID: profile.id
            });
            await newUser.save();
        }
        return done(null, user);
    }
    catch (e) {
        return done(null, false);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=authGG.middleware.js.map