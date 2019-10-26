const express = require('express');
const router = express.Router();
const mapper = require('../mapper/orderMapper');
const productMapper = require('../mapper/productMapper')

router.post('/add-order', (req, res) => {
    const userId = req.session.userid;
    const productId = req.body.productId;
    const quantity = Number(req.body.quantity);
    const totalPrice =  Number(quantity * req.session.productPrice)
    console.log(userId)
    console.log(productId)
    console.log(quantity)
    console.log(totalPrice)
    mapper.addOrder(userId, productId, quantity, totalPrice).then(order => {
        console.log(order)
        mapper.findOrder(order.insertId).then(order => res.render(`order`,{order: order} ) ).catch(err => console.log(err));
        
    }  ).catch(err => console.error(err));
})

router.get('/add-order', (req, res) => {
    const id =  req.query.productId
    productMapper.getProduct(id).then(product => {
 
        req.session.productPrice = product[0].price;
      
        res.render('addOrder', {product: product});
    })
    
})

router.get('/order', (req, res) => {
    mapper.findOrder(req.query.orderId).then(order => res.render(`order`, {order: order}) ).catch(err => console.error(err));
})

router.get('/userOrder/:userId', (req, res) => {
    mapper.findUsersOrder(req.params.userId).then(order => res.render('yourOrders', {order: order})).catch(err => console.error(err));
})

router.delete('/:orderId', (req, res) => {
    mapper.deletOrder(req.params.orderId).then(order => res.send("Order deleted")).catch(err => console.error(err));
})


module.exports = router