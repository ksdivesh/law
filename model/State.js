const table = "states";

class State {
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
    });
  }
}

module.exports = State;
