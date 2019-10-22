 const connection = require('../config/sql');

 createUser = (username, password) => {
    const sql = `insert into user(name, password) values(${connection.escape(username)}, ${connection.escape(password)})`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err,res) => {
            if(err){
                reject(err);
            }

            if(reject.length < 1){
                reject("pleas fill out all felid")
            }
        resolve(res);

        })
     });
 }

 validitUser = (username , password) => {
const sql = `select * from user where name = ${connection.escape(username)} and password = ${connection.escape(password)}`;
    return new Promise((resolve, reject) => {
connection.query(sql, (err, res) => {
    if(err){
        reject(err);
    }

if(res.length < 1){
   
    reject("user not found");
}
resolve(res);
    
});
});
 }

 const findUserById = (userId)  => {
    const sql = `select name from user where id = ${connection.escape(userId)} `;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if(err){
                reject(err)
            }

            if(res.length < 1){
                reject("user not found");
            }

            resolve(res)
        });
    });
    }

module.exports = {
    createUser: createUser,
    validitUser : validitUser,
    findUserById :  findUserById
}
