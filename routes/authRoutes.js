import passport from "passport";

const googleAuthRoutes = (app) => {
    // route for google signin page
    app.get("/auth/google", passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // returning route
    app.get(
        "/auth/google/callback",            // user comes here
        passport.authenticate('google'),    // passport verifies
        (req,res) => {                      // verified! now request goes to this
            res.redirect("/surveys");
        }
    );

    // logout route
    app.get("/api/logout",(req,res) => {
        req.logout();
        res.redirect("/");

        // Proof that user is logged out
        // res.send(req.user);  
    })

    // route for the loged in user
    app.get('/api/curr_user',(req,res) => {
        res.send(req.user);
    })
};

export default googleAuthRoutes;
