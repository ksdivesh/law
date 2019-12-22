const mysql = require("mysql");

exports.connectToDB = () => {
  // const db = mysql.createConnection({
  //   host: "remotemysql.com",
  //   user: "a2AVResZMP",
  //   password: "pOXXNddV6L",
  //   database: "a2AVResZMP"
  // });

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lawyer"
  });

  db.connect(err => {
    if (err) {
      throw err;
      res.json({ status: 0, message: "DB connection error" });
    }
  });

  console.log("Connected to database");

  global.db = db;
  //   next();
};

exports.closeConnection = (req, res, next) => {
  db.end(function(err) {
    console.log("connection is close now");
  });
};
