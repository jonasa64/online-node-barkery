module.exports.sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_barkery){
        res.redirect('/profil')
    }else {
        next();
    }
}