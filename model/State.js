const table = "states";

class State {
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
      });
    });
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

      // dbConnection.closeConnection();
    });
  }
}

module.exports = State;
