const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const mapper = require('../mapper/userMapper');
const userController = require('../Controllers/user');
const sessionChecker = require('../middeleware')


router.get('/login', userController.getLoginView());

router.get('/', sessionChecker, (req, res) => {
    req.flash("notify", "you are now logged in")       
  
    res.render('profil', {username : req.session.name, id: req.session.userid});
   
})

router.post('/login', userController.login());



router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
const username = req.body.username;
const password = req.body.password;
mapper.createUser(username, password).then(user => {
    req.session.user = user;
    res.render('login')
}).catch(err => {
    res.render('signup');
console.log(err);
})
});

router.post('logout', (req, res) => {
    req.session.destroy();
    res.render('login')
})


module.exports = router;