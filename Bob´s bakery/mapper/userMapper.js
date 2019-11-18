 const bcrypt = require('bcrypt');
 const connection = require('../config/sql');
 const util = require('util');
 const salt = 10;
 const query = util.promisify(connection.query).bind(connection);
 
 createUser = async (username, password) => {
     //hashPassword = bcrypt.hashSync(password, salt);
    const sql = `insert into user(name, password) values(${connection.escape(username)}, ${connection.escape(password)})`;
  try {
    const row =  await query(sql);
    return row;   
  } catch (error) {
      return new Error('server error');
  } finally{
      connection.end();
  }
   

   
 }

 validitUser = async (username , password) => {
const sql = `select * from user where name = ${connection.escape(username)} and password = ${connection.escape(password)}`;
try {
  const row =  await query(sql);
    console.log(row);
    if(row.length < 1){
        return "user not found";  
    }
    return row;
   
} catch (error) {
    return new Error("server error")
}   finally{
    connection.end()
}


  


 }

 const findUserById = async (userId)  => {
    const sql = `select name from user where id = ${connection.escape(userId)} `;
    try {
      const row =  await query(sql);
      return row;
    } catch (error) {
        return new Error('server error')
    } finally{
        connection.end()
    }
        
  
    }

 

module.exports = {
    createUser: createUser,
    validitUser : validitUser,
    findUserById :  findUserById
}
