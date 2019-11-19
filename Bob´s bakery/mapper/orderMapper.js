const connection = require('../config/sql');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const addOrder = async (userId, productId, quantity, totalPice) => {
const sql = `insert into orders(userId, productId, quantity, totalPice) values(${connection.escape(userId)}, ${connection.escape(productId)},
${quantity}, ${totalPice})`;
try {
  const row =  await query(sql);
  return row 
} catch (error) {
    return new Error("server error")
} finally{
    connection.end()
}

   


}



const findOrder = (orderId) => {
const sql = `select * from orders where id = ${connection.escape(orderId)}`;
try {
  const row =  await query(sql);
  return row;
} catch (error) {
    return new Error("server error");
} finally {
    connection.end()
}
    

}


const uddatePayStatus = async (orderId) => {
const sql = `update orders set isPayed = true where id = ${connection.escape(orderId)}`;
try {
   const row =  await query(sql);
   return row;
} catch (error) {
    return new Error("server Error");
} finally {
    connection.end()
}
    


}

const findUsersOrder =   async (userId) => {
    const sql = `select * from orders where userId = ${connection.escape(userId)}`;
   try {
   const row = await query(sql);
   return row;
   } catch (error) {
       return new Error("server error")
   }
       finally{
           connection.end()
       }
   
}

const deletOrder = (orderId) => {
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





module.exports = {
    addOrder : addOrder,
    findOrder : findOrder,
    uddatePayStatus : uddatePayStatus,
    findUsersOrder : findUsersOrder,
    deletOrder: deletOrder
}