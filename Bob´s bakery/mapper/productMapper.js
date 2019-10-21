const connection = require('../config/sql');


const getAllProducts = () => {
const sql = "select * from  product";
return new Promise((resolve, reject) => {
    connection.query(sql, (err,result,fields) => {
        if(err){
           return reject(err);
        }

      
      
        resolve(result);
      //connection.destroy();
    } );
} );


}

const getProduct = (id) => {
 
const sql = "select * from product where id = " + connection.escape(id);
return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
        if(err){
            reject(err);
        }
        resolve(res);
     
        // connection.destroy();
    })
})

}

module.exports = {
    getAllProducts: getAllProducts,
    getProduct : getProduct
}