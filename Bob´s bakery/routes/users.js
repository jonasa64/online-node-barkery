const express = require('express');
const router = express.Router();
const mapper = require('../mapper/userMapper');



router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req,res) => {
const name = req.body.username;
const password = req.body.password;
mapper.validitUser(name,password).then(user => {
    res.render('profil', {user: user});
}).catch(err => {
    res.render('login');
    console.log(err);
})

});



router.get('signup', (req, res) => {
    res.render('signup');
});

router.post('signup', (req, res) => {
const username = req.body.username;
const password = req.body.password;
mapper.createUser(username, password).then(user => {
    res.render('profil', {user:user});
}).catch(err => {
console.log(err);
})
});


module.exports = router;