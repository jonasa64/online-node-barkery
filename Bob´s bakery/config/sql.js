const sql = require('mysql');


const connection = sql.createConnection({
    host: "",
    user: "",
    password : "",
    database: "bakery"
});

connection.connect(err=> {
if(err){
    throw err;
}

console.log("connected");

})


module.exports = connection;
