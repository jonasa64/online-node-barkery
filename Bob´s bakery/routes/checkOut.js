const express = require('express');
const router = express.Router();
const checkOutController = require('../Controllers/checkOut');

router.get('/', checkOutController.getCheckOutView);

router.post('/makepayment',checkOutController.makePayment);

module.exports = router;
