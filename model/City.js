const table = "districts";

class City {
  listByStateId(stateId, orderby = "") {
    let sql = `SELECT *  FROM ${table} WHERE state_id = ${stateId}`;

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

module.exports = City;
