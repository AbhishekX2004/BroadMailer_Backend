function reqCredits(req, res, next) {
    if(req.user.credits < 1){
        res.status(403).send("You dont\'t have enough credits!!");
    }
    next();
};

export default reqCredits;