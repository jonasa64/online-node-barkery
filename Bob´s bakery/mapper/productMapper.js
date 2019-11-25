const connection = require('../config/sql');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const getAllProducts = async () => {
const sql = "select * from  product";
try {
  const row =  await query(sql);
  return row
} catch (error) {
    return new Error("server error")
}
    



}

const getProduct = async (id) => {
 
const sql = "select * from product where id = " + connection.escape(id);

   try {
    const row =  await query(sql)  
    return row;   
} catch (error) {
    return new Error("server Error");   
   }


}

module.exports = {
    getAllProducts: getAllProducts,
    getProduct : getProduct
}