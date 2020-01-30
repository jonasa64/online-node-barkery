const express = require('express');
const router = express.Router();
const orderCrontroller = require('../Controllers/order');
const sessionChecker = require('../middeleware')

router.post('/add-order', sessionChecker, orderCrontroller.addOrder);

router.get('/add-order', sessionChecker, orderCrontroller.getAddOrderView);

router.get('/order', sessionChecker, orderCrontroller.getOrder);

router.get('/userOrder/:userId', sessionChecker, orderCrontroller.getUserOrders);




module.exports = router