const connection = require('../config/sql');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

exports.addOrder = async (userId, productId, quantity, totalPice, name, email, address, city, province, zip) => {
const sql = `insert into orders(userId,productId,quantity,totalPice,name,email,address,city,province,zip) values(${connection.escape(userId)}, ${connection.escape(productId)},
 ${connection.escape(quantity)},${connection.escape(totalPice)},${connection.escape(name)},${connection.escape(email)},${connection.escape(address)},${connection.escape(city)},${connection.escape(province)},${connection.escape(zip)})`;
try {
  const row =  await query(sql);
  return row 
} catch (error) {
    return new Error("server error")
}

   


}

exports.getAllOrders = async() => {
    const  sql = "select * from orders";
    try {
        const row = await query(sql);
        return row;
    }catch (error) {
        return  new Error("server error");
    }
}

exports.findOrder = async (orderId) => {
const sql = `select * from orders where id = ${connection.escape(orderId)}`;
try {
  const row =  await query(sql);
  return row;
} catch (error) {
    return new Error("server error");
}
    

}


exports.uddatePayStatus = async (orderId) => {
const sql = `update orders set isPayed = true where id = ${connection.escape(orderId)}`;
try {
   const row =  await query(sql);
   return row;
} catch (error) {
    return new Error("server Error");
}
    


}

exports.findUsersOrder =   async (userId) => {
    const sql = `select * from orders where userId = ${connection.escape(userId)}`;
   try {
   const row = await query(sql);
   return row;
   } catch (error) {
       return new Error("server error")
   }
      
   
}

exports.deletOrder = async (orderId) => {
    const sql = `delete from orders where id = ${connection.escape(orderId)}`;

    try {
      const row =  await query(sql);
        return row;
    } catch (error) {
        return new Error("server error");
    } finally{
        connection.end()
    }
        
   
}
