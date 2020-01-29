const sessionChecker = (req, res, next) => {
    if(!req.session.userid){
        res.redirect('http://localhost:5000/user/login');
    }else {
        next();
    }
}

module.exports = sessionChecker;