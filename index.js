import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import configurePassport from "./services/passport.js";
import googleAuthRoutes from "./routes/authRoutes.js";
import { cookieKey } from "./config/keys.js";

import { mongoURI } from "./config/keys.js";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
    cookieSession({
        maxAge: 24*60*60*1000,  // 1 day
        keys: [cookieKey]   //secures the cookie [encrypt]
    })
)
app.use(passport.initialize());
app.use(passport.session());
    
// configures Passport
configurePassport();

// mongoose connection
mongoose.connect(mongoURI);

// auth Routes
googleAuthRoutes(app);

app.listen(PORT,()=>{
    console.log(`App is listening on port:${PORT}`);
})