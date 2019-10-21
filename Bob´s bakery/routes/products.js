const express = require('express');
const router = express.Router();
const mapper = require('../mapper/productMapper');
router.get("/", (req,res) => {
    mapper.getAllProducts().then(p =>{
        res.render("products", {products:p });
    } );
   
console.log(mapper.getAllProducts());
    //res.render("products");
});


router.get("/:id", (req,res) => {
    const id = req.params.id;
    res.render("products", {products: mapper.getAllProducts(id)});
});


module.exports = router;

