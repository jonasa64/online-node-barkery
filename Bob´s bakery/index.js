const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const user = require('./routes/users');
const port = process.env.port || 5000;

const app = express();


app.listen(port, () => {
    console.log(`server started on  ${port}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/user", user);
app.use("/products", products);
app.set('views', './Views')
app.set('view engine', 'ejs');
