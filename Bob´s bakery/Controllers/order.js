const mapper = require('../mapper/orderMapper');
const productMapper = require('../mapper/productMapper')

exports.getOrder =  async (req, res) => {
    try {
        const  order = await mapper.findOrder(req.query.orderId);
            return res.render(`order`, {order: order});

    } catch (e) {
      return res.send("error failed to get order");
    }
}


exports.getUserOrders = async (req, res) => {
    try {
        const userOrders = await mapper.findUsersOrder(req.params.userId);
        return res.render('yourOrders', {order: userOrders});
    } catch (e) {
        res.send('error failed to find your orders');
    }
}

exports.addOrder = async (req, res) => {
    const userId = req.session.userid;
    const productId = req.body.productId;
    const quantity = Number(req.body.quantity);
    const totalPrice =  Number(quantity * req.session.productPrice);

    try {
     const newOrder =   await  mapper.addOrder(userId, productId, quantity, totalPrice);
      const order = mapper.findOrder(newOrder.insertId);
      return  res.render(`order`,{order: order} );
    }catch (e) {
        return res.send('error');
    }
}


exports.getAddOrderView = async (req,res) => {
    try {
       const product = await productMapper.getProduct(req.query.productId);
        req.session.productPrice = product[0].price;

        return res.render('addOrder', {product: product});
        }catch (e) {
        return res.send("error");
    }
}



