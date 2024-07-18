// config/passport-setup.js
import { configDotenv } from 'dotenv'
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth20'
import User from '../models/userModel.js';


configDotenv();


passport.use(
    new OAuth2Strategy({
        clientID: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_CLIENT_SECRET,
        callbackURL: process.env.G_CALLBACK_URL,
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(refreshToken);
        try {
            let user =await User.findOne({ ssoId: profile.id}).exec();
            if (user){
                console.log("user with gmail exists")
                return done(null, user);
            }
            // user={id:1, name:"test"}
            // throw Error("Test Error!")
            if (!user) {
                console.log("User didn't exist, creating.")
                console.log(profile);
                user = new User({
                    username: profile.emails[0].value,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    ssoId: profile.id,
                    ssoProvider: profile.provider,
                    photourl: profile.photos[0].value
                });

                await user.save();
            }
            
            const createdUser=await User.findOne({ ssoId: profile.id}).exec();
            return done(null, createdUser);   
        } catch (error) {
            console.log("This is error", error.message)
            return done(error, null);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport
