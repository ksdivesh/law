const table = "clients_info";
const dbConnection = require("../helper/db"); 


class ClientInfo {


  constructor(){
    dbConnection.connectToDB(); 
  }

  get(where = "", orderby = "") {
    let sql = `SELECT * FROM ${table} `;

    if (where !== "") {
      sql += " WHERE 1=1";
      sql += where;
    }

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

  add(data) {
    let objArray = this.mapObject(data);

    let sql = `INSERT INTO ${table} (clientid, first_name, middle_name, last_name, mobile, state, district, pin) VALUES (?) `;

    return new Promise((resolve, reject) => {
      db.query(sql, [objArray], function(err, result) {
        if (err) reject(err);
        resolve(result);
      });

      dbConnection.closeConnection(); 
    });
  }

  mapObject(data) {
    let objArray = [
      data.clientid,
      data.first_name,
      data.middle_name,
      data.last_name,
      data.mobile,
      data.state,
      data.district,
      data.pin
    ];

    if (data.id !== undefined && data.id !== "" && data.id !== NULL) {
      objArray.unshift(data.id);
    }

    return objArray;
  }
}

module.exports = ClientInfo;
