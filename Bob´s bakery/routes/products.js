const express = require('express');
const router = express.Router();
const mapper = require('../mapper/productMapper');
const sessionChecker = require('../middeleware')
router.get("/", sessionChecker, (req,res) => {
    mapper.getAllProducts().then(p =>{
        console.log(req.session)
        res.render("products", {products:p });
    } );
   

    //res.render("products");
});


router.get("/:id", sessionChecker, (req,res) => {
    const id = req.params.id;
    res.render("products", {products: mapper.getAllProducts(id)});
});


module.exports = router;

