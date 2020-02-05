const express = require('express');
const router = express.Router();
const mapper = require('../mapper/productMapper');
const productComntroller = require('../Controllers/product');
const sessionChecker = require('../middeleware')

router.get("/", productComntroller.getProducts );
   
router.get("/:id", sessionChecker, productComntroller.getProduct);

router.get("/edit/:id", productComntroller.getEditView);

router.put('/edit/:id', productComntroller.updateProduct);

router.delete('/delete/:id', productComntroller.deleteProduct);

router.get('/add', productComntroller.getAddProduct);

router.post('/add', productComntroller.addProduct);

module.exports = router;

