import passport from "passport";


const googleAuthRoutes = (app) => {
    app.get("/auth/google", passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get("/auth/google/callback", passport.authenticate('google'));

    app.get("/api/logout",(req,res) => {
        req.logout();
        res.send(req.user);
    })

    app.get('/api/curr_user',(req,res) => {
        res.send(req.user);
    })
};

export default googleAuthRoutes;
