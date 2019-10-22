const express = require('express');
const router = express.Router();
const mapper = require('../mapper/orderMapper');

router.post('/add-order', (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = Number(req.body.totalPrice);
    mapper.addOrder(userId, productId, quantity, totalPrice).then(order => res.redirect('/0') ).catch(err => console.error(err));
})

router.get('/add-order', (req, res) => {
    res.render('addOrder')
})

router.get('/:orderId', (req, res) => {
    mapper.findOrder(req.params.orderId).then(order => res.render("order", {order: order}) ).catch(err => console.error(err));
})

router.get('/userOrder/:userId', (req, res) => {
    mapper.findUsersOrder(req.params.userId).then(order => res.render('yourOrders', {order: order})).catch(err => console.error(err));
})

router.delete('/:orderId', (req, res) => {
    mapper.deletOrder(req.params.orderId).then(order => res.send("Order deleted")).catch(err => console.error(err));
})


module.exports = router