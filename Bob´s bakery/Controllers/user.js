const mapper = require('../mapper/userMapper');

exports.getLoginView = (req,res) => {
    try {
        return  res.render('login');
    }catch (e) {
        res.send("error");
    }
}

exports.login = async (req, res) => {
    const name = req.body.username;
    const password = req.body.password;

    try {
        const user = await mapper.validitUser(name, password);
        req.session.name = user[0].name;
        req.session.userid = user[0].id;

        return  res.redirect('http://localhost:5000/user');
    }catch (error) {
        req.flash("error", "falied to login")
     return res.render('login')

    }
}