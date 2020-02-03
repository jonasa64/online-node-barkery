const mapper = require('../mapper/productMapper');

exports.getProduct = async (req,res) => {
    const id = req.params.id;
    try {
        const product = await mapper.getProduct(id);
        return res.render("products", {products: product});
    }catch (e) {
        return res.send('error');
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await mapper.getAllProducts();
        return  res.render("products", {products:products });
    }catch (error) {
        return res.send("error");
    }
}

exports.deleteProduct = async (req, res) => {
        const id = req.params.id;
    try {
        await mapper.deleteProduct(id);
        return "product delete";
    } catch (error) {
        return res.send("error");
    }
}