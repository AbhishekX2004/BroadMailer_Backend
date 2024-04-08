import passport from "passport";

const googleAuthRoutes = (app) => {
    // route for google signin page
    app.get("/auth/google", passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // returning route
    app.get("/auth/google/callback", passport.authenticate('google'));

    // logout route
    app.get("/api/logout",(req,res) => {
        req.logout();
        res.send(req.user);
    })

    // route for the loged in user
    app.get('/api/curr_user',(req,res) => {
        res.send(req.user);
    })
};

export default googleAuthRoutes;
