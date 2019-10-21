const express = require('express');
const router = express.Router();
const mapper = require('../mapper/orderMapper');

router.post('/add-orders', (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    mapper.addOrder(userId, productId, quantity, totalPrice).then(order => res.send("order added")).catch(err => console.error(err));
})

router.get('/:orderId', (req, res) => {
    mapper.findOrder(req.params.orderId).then(order => res.send(order)).catch(err => console.error(err));
})

router.get('/userOrder/:userId', (req, res) => {
    mapper.findUsersOrder(req.params.userId).then(order => res.send(order)).catch(err => console.error(err));
})

router.delete('/:orderId', (req, res) => {
    mapper.deletOrder(req.params.orderId).then(order => res.send("Order deleted")).catch(err => console.error(err));
})


module.exports = router