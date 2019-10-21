const connection = require('../config/sql');

const addOrder = (userId, productId, quantity, totalPice) => {
const sql = `insert into orders(userId, productId, quantity, totalPice) values(${connection.escape(userId)}, ${connection.escape(productId)},
${quantity}, ${totalPice})`;

return new Promise( (resolve, reject)  => {
    connection.query(sql, (err, res) => {
        if(err){
            reject(err);
        }

        if(res.length < 1){
            reject("falied to creat order");
        }

        resolve(res);
    });
});

}



const findOrder = (orderId) => {
const sql = `select * from orders where id = ${connection.escape(orderId)}`;
return new Promise( (resolve, reject) => {
    connection.query(sql, (err, res) => {
        if(err){
            reject(err);
        }

        if(res.length < 1){
            reject("order not found");
        }

        resolve(res);

    });
});
}


const uddatePayStatus = (orderId) => {
const sql = `update orders set isPayed = true where id = ${connection.escape(orderId)}`;
return new Promise( (resolve, reject ) => {
    connection.query(sql, (err, res) => {
        if(err){
            reject(err);
        }

        if(res.length < 1){
            reject('failed to update pay satatus');
        }

        resolve(res);
    });
}) ;

}

const findUsersOrder =   (userId) => {
    const sql = `select * from orders where userId = ${connection.escape(userId)}`;
    return new Promise( (resolve, reject) => {
        connection.query(sql, (err, res) => {
            if(err){
                reject(err);
            }

            if(res.length < 1){
                reject('orders not found');
            }

            resolve(res);
        });
    });
}

const deletOrder = (orderId) => {
    const sql = `delete from orders where id = ${connection.escape(orderId)}`;

    return new Promise( (resolve, reject) => {
        connection.query(sql, (err, res) => {
            if(err){
                reject(err);
            }

            if(res.length < 1){
                reject("failed");
            }
            resolve(res);
        })
    })
}


module.exports = {
    addOrder : addOrder,
    findOrder : findOrder,
    uddatePayStatus : uddatePayStatus,
    findUsersOrder : findUsersOrder,
    deletOrder: deletOrder
}