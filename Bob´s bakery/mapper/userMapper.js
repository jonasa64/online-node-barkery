 const bcrypt = require('bcryptjs');
 const connection = require('../config/sql');
 const util = require('util');
 const salt = 10;
 const query = util.promisify(connection.query).bind(connection);
 
exports.createUser = async (username, password) => {
     hashPassword = bcrypt.hashSync(password, salt);
    const sql = `insert into users(name, password) values(${connection.escape(username)}, ${connection.escape(hashPassword)})`;
  try {
    const row =  await query(sql);
    return row;   
  } catch (error) {
      return new Error('server error');
  } 
   

   
 }

exports.validitUser = async (username , password) => {
    try {
    const hashPassword  = await findUserByName(username);

    if(bcrypt.compareSync(password, hashPassword) ){

        const sql = `select * from users where name = ${connection.escape(username)} and password = ${connection.escape(hashPassword)}`;

  const row =  await query(sql);
  console.log(row);
    if(row.length < 1){
        return "user not found";  
    }
    return row;
}
} catch (error) {
        console.log(error);
    return new Error("server error")
}  
    


}

 exports.findUserById = async (userId)  => {
    const sql = `select name from users where id = ${connection.escape(userId)} `;
    try {
      const row =  await query(sql);
      return row;
    } catch (error) {
        return new Error('server error')
    } 
        
  
    }
const findUserByName = async (username) => {
    const sql = `select password from users where name = ${connection.escape(username)} `;
    try {
      const row =  await query(sql);
      
      return row[0].password;
    } catch (error) {
        return new Error('server error')
    } 
}


 


