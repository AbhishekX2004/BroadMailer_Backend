import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import configurePassport from "./services/passport.js";
import googleAuthRoutes from "./routes/authRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import bodyParser from "body-parser";
import { cookieKey } from "./config/keys.js";

import { mongoURI } from "./config/keys.js";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 8080;

// to handel promises using async and await do it as follows - 
const initialize = async () => {
    app.use(
        cookieSession({
            maxAge: 24*60*60*1000,  // 1 day
            keys: [await cookieKey]   //secures the cookie [encrypt]
        })
    )

    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    
    // configures Passport
    configurePassport();
    
    // mongoose connection
    mongoose.connect(await mongoURI);
    
    // auth Routes
    googleAuthRoutes(app);

    // billing Routes
    billingRoutes(app);

    app.listen(PORT,()=>{
        console.log(`App is listening on port:${PORT}`);
    });
}

// now run the code once all promises are recieved
initialize();




// // this is one way to handel promises 
// cookieKey.then(key => {
//     app.use(
//         cookieSession({
//             maxAge: 24*60*60*1000,  // 1 day
//             keys: [key]   //secures the cookie [encrypt]
//         })
//     )
//     app.use(passport.initialize());
//     app.use(passport.session());
        
//     // configures Passport
//     configurePassport();
    
//     // mongoose connection
//     mongoURI.then(uri => {
//         mongoose.connect(uri);
//     });
    
//     // auth Routes
//     googleAuthRoutes(app);
    
//     app.listen(PORT,()=>{
//         console.log(`App is listening on port:${PORT}`);
//     })
// })