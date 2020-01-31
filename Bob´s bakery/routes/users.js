const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');
const sessionChecker = require('../middeleware')


router.get('/login', userController.getLoginView);

router.get('/', sessionChecker, userController.getProfile);

router.post('/login', userController.login);

router.get('/signup', userController.getSingupView);

router.post('/signup', userController.signup);

router.post('logout', userController.logout);

router.get('/admin', userController.getAdminView);


module.exports = router;