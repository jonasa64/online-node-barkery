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
        return  res.render("products", {products:products ,  role : req.session.role });
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

exports.updateProduct = async (req, res) => {
    const name = req.body.nme;
    const description = req.body.description;
    const price = req.body.price;
    const img = req.body.img;
    try {
        await mapper.updateProduct(name,description, price, img);
        return "product updated"
    }catch (error) {
        return res.send("error");
    }
}

exports.getEditView = async (req, res) => {
    const id = req.params.id;
    try {
        const product = mapper.getProduct();
        return res.render('productEdit', {product : product});
    }catch (error) {
        return res.send("Error");
    }
}

exports.getAddProduct = (req, res) => {
    try {
        return res.render('addProduct');
    }catch (error) {
        return res.send("server error");
    }
}

exports.addProduct = async (req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const img = req.body.img;
    try {
        await mapper.addProduct(name, description, price, img);
        return "product created";
    }catch (error) {
        return res.send("error");
    }
}
