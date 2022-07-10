import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20";
import {User} from "../schema/user.model";


passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

passport.use(new GoogleStrategy({
        clientID: "262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async function (request, accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({"googleID": profile.id})

        if (!user) {
            const newUser = new User({
                username: profile.displayName,
                password: "123",
                googleID: profile.id
            })
            await newUser.save();
        }
        return done(null,user)
    }catch (e) {
        return done(null,false)
    }




    }))


export default passport
