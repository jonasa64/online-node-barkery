const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const mapper = require('../mapper/userMapper');
const sessionChecker = require('../middeleware')


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/', sessionChecker, (req, res) => {
    req.flash("notify", "you are now logged in")       
  
    res.render('profil', {username : req.session.name, id: req.session.userid});
   
})

router.post('/login', (req,res) => {
const name = req.body.username;
const password = req.body.password;

mapper.validitUser(name,password).then(user => {
    

    req.session.name = user[0].name;
    req.session.userid = user[0].id;
    

     
        
        
         res.redirect('http://localhost:5000/user');
      
        
 
    
       

  
}).catch(err => {
 console.log(err)
 req.flash("error", "falied to login")       
 res.render('login')
   
   
})

});



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