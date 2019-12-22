const md5 = require("md5");
const table = "clients";

class Client {
  constructor() {
    // dbConnection.connectToDB();
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
        // dbConnection.closeConnection();
      });
    });
  }

  login(data) {
    data.password = md5(data.password);
    let sql = ` SELECT * FROM ${table} WHERE username = '${data.username}' AND password = '${data.password}' AND usertype = 'CLIENT' `;

    return new Promise((resolve, reject) => {
      db.query(sql, function(err, result, fields) {
        if (err) reject(err);

        if (result.length > 0) {
          console.log(result[0].id);
          resolve(result[0]);
        } else {
          reject(false);
        }
      });

      // dbConnection.closeConnection();
    });
  }

  add(data) {
    let objArray = this.mapObject(data);

    let sql = `INSERT INTO ${table} (username, password, usertype) VALUES (?) `;

    return new Promise((resolve, reject) => {
      db.query(sql, [objArray], function(err, result) {
        if (err) reject(err);
        resolve(result);
      });

      // dbConnection.closeConnection();
    });
  }

  mapObject(data) {
    let objArray = [data.username, data.password, data.usertype];

    if (data.id !== undefined && data.id !== "" && data.id !== NULL) {
      objArray.unshift(data.id);
    }

    return objArray;
  }
}

module.exports = Client;
