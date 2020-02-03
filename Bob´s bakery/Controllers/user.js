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
        console.log(user);
        req.session.name = user[0].name;
        req.session.userid = user[0].id;
    if(user[0].role === 'admin'){
         res.redirect('http://localhost:5000/user/admin');
    }else {
          res.redirect('http://localhost:5000/user');
    }

    }catch (error) {
        req.flash("error", "falied to login")
     return res.render('login')

    }
}

exports.getAdminView = (req, res) => {
    try {
        res.render('admin');
    }catch (e) {
        res.send('error');
    }
}

exports.getProfile = (req, res) => {
    try {
        req.flash("notify", "you are now logged in")

        return res.render('profil', {username : req.session.name, id: req.session.userid});

    }catch (error) {
        return res.send("error");
    }
}

exports.getSingupView = (req, res) => {
    try {
        return  res.render('signup');
    }catch (error) {
        res.send("error");
    }
}

exports.signup = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
    const user = await mapper.createUser(username, password);
        req.session.user = user;
      return  res.render('login')
    }catch (error) {
        return   res.render('signup');
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy();
       return  res.render('login');
    }catch (error) {
        return res.send('error');
    }
}