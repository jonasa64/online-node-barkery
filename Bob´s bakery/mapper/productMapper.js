const connection = require('../config/sql');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

exports.getAllProducts = async () => {
const sql = "select * from  products";
try {
  const row =  await query(sql);
  return row
} catch (error) {
    return new Error("server error")
}
    



}

exports.getProduct = async (id) => {
 
const sql = "select * from products where id = " + connection.escape(id);

   try {
    const row =  await query(sql)  
    return row;   
} catch (error) {
    return new Error("server Error");   
   }


}


exports.addProduct = async (name, description, price, img=null) => {
    const sql = `insert into products(name,description,price, img)values(${query.escape(name)}, ${description}), ${price}, ${img}`;
    try {
        await query(sql);


    }catch (error) {
        return new Error("server Error");
    }

}

