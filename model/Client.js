const table = "clients";

class Client {
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

  add(data) {
    let objArray = this.mapObject(data);

    let sql = `INSERT INTO ${table} (username, password, usertype) VALUES (?) `;

    return new Promise((resolve, reject) => {
      db.query(sql, [objArray], function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
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
