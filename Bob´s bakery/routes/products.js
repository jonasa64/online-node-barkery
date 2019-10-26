const express = require('express');
const router = express.Router();
const mapper = require('../mapper/productMapper');
router.get("/", (req,res) => {
    mapper.getAllProducts().then(p =>{
        console.log(req.session)
        console.log(req.cookies)
        res.render("products", {products:p });
    } );
   

    //res.render("products");
});


router.get("/:id", (req,res) => {
    const id = req.params.id;
    res.render("products", {products: mapper.getAllProducts(id)});
});


module.exports = router;

