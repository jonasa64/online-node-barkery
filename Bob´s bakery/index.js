const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const orders = require('./routes/orders');
const user = require('./routes/users');
const session = require('express-session');
//const validator = require('express-validator')
const port = process.env.port || 5000;
//const {sessionChecker} = require('./middeleware');

const app = express();


app.listen(port, () => {
    console.log(`server started on  ${port}`);
});

//middelwares


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
//app.use(validator());





app.set('views', './Views')
app.set('view engine', 'ejs');
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
/*
app.use((req,res, next) => {
  console.log(req.cookies)
  next()
})
*/
app.use("/user", user);
app.use("/products", products);
app.use("/orders", orders);






