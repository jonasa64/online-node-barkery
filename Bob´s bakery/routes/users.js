const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const mapper = require('../mapper/userMapper');



router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req,res) => {
const name = req.body.username;
const password = req.body.password;

mapper.validitUser(name,password).then(user => {
    

        
       
            req.session.name = user[0].name;
            req.session.userid = user[0].id;
            res.render('profil',{userName:req.session.name, userid: req.session.userid})
        
      
        
 
    
       

  
}).catch(err => {
 
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