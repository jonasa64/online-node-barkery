const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const orders = require('./routes/orders');
const user = require('./routes/users');
const cart = require('./routes/cart');
const session = require('express-session');
const flash = require('express-flash-messages')
const methodOveride = require('method-override');
const sessionChecker = require('./middeleware')
const path = require('path');

const port = process.env.port || 5000;



const app = express();

app.use(methodOveride('_method'));

app.use('/static', express.static(path.join(__dirname, 'public')));

//middelwares


app.use(session({
    key : "user_barkery",
    secret: "Jonas er sej",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 *60 *2,
        sameSite: true
    }
 
}))
app.use(flash())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))






app.set('views', './Views')
app.set('view engine', 'ejs');







app.use("/user",  user);
app.use("/products",  products);
app.use("/orders", orders);
app.use('/cart', cart);


app.listen(port, () => {
    console.log(`server started on  ${port}`);
});




