const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cart');


router.get('/show', cartController.getCartView);

router.post('/add', cartController.addToCart);

router.delete('/:id', cartController.removeItem);

router.put('/:id', cartController.updateCart);

module.exports = router;
