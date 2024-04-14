function reqLogin(req, res, next) {
    if(!req.user){
        res.status(401).send("Login required to access!!");
    }
    next();
};

export default reqLogin;