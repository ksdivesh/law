const table = "states";
const dbConnection = require("../helper/db"); 



class State {


  constructor(){
    dbConnection.connectToDB(); 
  }


  list(orderby = "") {
    let sql = `SELECT  * FROM ${table} `;

    if (orderby !== "") {
      sql += orderby;
    }

    return new Promise((resolve, reject) => {
      db.query(sql, function(err, result, fields) {
        if (err) reject(err);
        resolve(result, fields);
      });

      dbConnection.closeConnection(); 

    });
  }
}

module.exports = State;
