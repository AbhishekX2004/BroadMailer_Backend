import { googleClientID as devGoogleClientID, googleClientSecret as devGoogleClientSecret, mongoURI as devMongoURI, cookieKey as devCookieKey } from "./dev.js";
import { googleClientID as prodGoogleClientID, googleClientSecret as prodGoogleClientSecret, mongoURI as prodMongoURI, cookieKey as prodCookieKey } from "./prod.js";

let googleClientID, googleClientSecret, mongoURI, cookieKey;

if (process.env.NODE_ENV === "production") {
    googleClientID = prodGoogleClientID;
    googleClientSecret = prodGoogleClientSecret;
    mongoURI = prodMongoURI;
    cookieKey = prodCookieKey;
} else {
    googleClientID = devGoogleClientID;
    googleClientSecret = devGoogleClientSecret;
    mongoURI = devMongoURI;
    cookieKey = devCookieKey;
}

export { googleClientID, googleClientSecret, mongoURI, cookieKey };
