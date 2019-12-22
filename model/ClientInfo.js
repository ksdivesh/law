const table = "clients_info";

class ClientInfo {
  constructor() {}

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

    let sql = `INSERT INTO ${table} (clientid, first_name, middle_name, last_name, mobile, state, district, pin, telephone, experience, regno, specialized_in, work_in, office_address, consultation_fee, profile_pic, status) VALUES (?) `;

    return new Promise((resolve, reject) => {
      db.query(sql, [objArray], function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  update(data, prevData, where) {
    // this.get(where)
    //   .then((result, fields) => {
    let first = prevData;
    for (const property in data) {
      first[property] = data[property];
    }

    let objArray = this.mapObject(first);

    console.log("--obj array------");
    console.log(objArray);

    let sql = `UPDATE ${table} SET clientid = ?, first_name = ?, middle_name = ?, last_name = ?, mobile = ?, state = ?, district = ?, pin = ?, telephone = ?, experience = ?, regno = ?, specialized_in = ?, work_in = ?, office_address = ?, consultation_fee = ?, profile_pic = ?, status = ? `;

    if (where !== undefined && where !== "") {
      sql += ` WHERE 1 = 1 `;
      sql += where;
    }

    console.log(sql);

    return new Promise((resolve, reject) => {
      db.query(sql, objArray, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
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
      data.pin,
      data.telephone,
      data.experience,
      data.regno,
      data.specialized_in,
      data.work_in,
      data.office_address,
      data.consultation_fee,
      data.profile_pic,
      data.status
    ];

    // if (data.id !== undefined && data.id !== "" && data.id !== NULL) {
    //   objArray.unshift(data.id);
    // }

    return objArray;
  }
}

module.exports = ClientInfo;
