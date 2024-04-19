// variable to hold the promise
let config;

// using a promise based model to give a promise of the values (direct import and use will give undefined)
if (process.env.NODE_ENV === "production") {
    config = import("./prod.js");
} else {
    config = import("./dev.js");
}

// exports the promises
// importing files must be able to handel the promises
export const googleClientID = config.then(cfg => cfg.googleClientID);
export const googleClientSecret = config.then(cfg => cfg.googleClientSecret);
export const mongoURI = config.then(cfg => cfg.mongoURI);
export const cookieKey = config.then(cfg => cfg.cookieKey);
export const stripeSecretKey = config.then(cfg => cfg.stripeSecretKey);
export const sendGridKey = config.then(cfg => cfg.sendGridKey);
export const redirectDomain = config.then(cfg => cfg.redirectDomain);