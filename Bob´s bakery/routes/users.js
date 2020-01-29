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

router.post('/signup', userController.signup());

router.post('logout', (req, res) => {
    req.session.destroy();
    res.render('login')
})


module.exports = router;