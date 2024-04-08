import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import { googleClientID, googleClientSecret } from "../config/keys.js";
import User from "../models/user.js";

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then(user => {
            done(null,user);
        }
    );
});

const configurePassport = () => {
    passport.use(
        new Strategy({
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            // console.log("\nAccess Token :: ", accessToken);
            // console.log("\nRefresh Token :: ", refreshToken);
            // console.log("\nProfile :: ", profile);

            User.findOne({
                googleId: profile.id
            }).then((exist) => {
                if(exist){
                    //
                    done(null,exist);
                } else {
                    // held localy
                    new User({ googleId: profile.id })
                        .save() // saves it to db  
                        .then(user => done(null,user));
                }
            });

            
        })
    );
};

export default configurePassport;
