
const mapper = require('../mapper/orderMapper');
const stripe = require('stripe')("SK KEY");

exports.getCheckOutView = (req, res) => {
    try {
        res.render('checkOut', {cart : req.session.cart});
    } catch (error) {
        res.render("checkOut");
    }
}

exports.makePayment =  (req, res) => {
    try {
let amount = 0;
        req.session.cart.forEach((el) => {
    amount += el.total;
})
  amount = Number((amount.toString() + 0 ).replace(".", ""));
     


    stripe.customers.create({
        email: req.body.email,
        source : req.body.stripeToken
    }).then(customer => stripe.charges.create({
        amount,
        description: "cakes form our barkery",
        currency: "dkk",
        customer: customer.id
    }).then(charge => console.log(charge) )).catch(err => console.log(err));




req.session.cart.forEach( async (el) => {
        await mapper.addOrder(req.session.userid, Number(el.id), el.qty, el.total, req.body.name, req.body.email, req.body.address, req.body.city,
            req.body.province, Number(req.body.zip));
    });



        delete  req.session.cart


        res.redirect('http://localhost:5000/thankyou');
        }catch (error) {
        res.render('checkOut');
    }
}
