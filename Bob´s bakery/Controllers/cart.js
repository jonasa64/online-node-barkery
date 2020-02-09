let cart = [];

exports.getCartView = (req, res) => {

  console.log(req.session.cart);


    try {

        if(req.session.cart == undefined || req.session.cart.length == 0){
            req.session.cart = cart;
            res.render('cart');
        }else {
                res.render('cart', {cart : req.session.cart});


        }

}catch (e) {

}
}

exports.updateCart = (req, res) => {
    const index = req.params.id;
    const qty = req.body.quantity;
    try {
        console.log(qty);
req.session.cart[index].qty = qty;
req.session.cart[index].total = req.session.cart[index].price * qty;
req.flash('success', 'cart is updated');
req.session.cart.forEach((el) => {
    console.log(el);
})
        res.render('cart', {cart : req.session.cart});
} catch (error) {
        req.flash('error', 'failed to update cart');
        res.render('cart', {cart : req.session.cart});
}
}

exports.removeItem = (req, res) => {
try {
    req.session.cart.splice(req.params.id, 1);
    res.redirect("http://localhost:5000/cart/show");
}catch (e) {
res.send("error");
}
}

exports.addToCart = (req, res) => {
 if(req.session.cart === undefined){
     req.session.cart = cart;
 }


   const item = {
       id: req.body.productId, 
       name : req.body.name,
       qty : req.body.quantity,
       price : req.body.price,
       total : req.body.price * req.body.quantity
   }
    try {
    const dublict = req.session.cart.filter((el) => {
        return el.name === item.name;
    });

        if(dublict.length){
            console.log("is in cart");
            req.flash('error', 'item is in cart');
            res.redirect("http://localhost:5000/cart/show");
        } else {
            req.flash('success', 'item is add to cart');
            req.session.cart.push(item)
            res.redirect("http://localhost:5000/cart/show");
        }
    }catch (e) {

    }
}

