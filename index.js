let express = require("express");
let partials = require("express-partials");
let app = express();
var session = require("express-session");
const mysql = require("mysql");
const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");
const path = require("path");
var Cookies = require("cookies");
const auth = require("./helper/auth_helper");

let apiRoutes = require("./routes/api-routes");
let appRoutes = require("./routes/app-routes");

var port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(
  session({
    secret: "app",
    cookie: { maxAge: 6000 },
    resave: true,
    saveUninitialized: true
  })
);

app.use(partials());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const connectToDB = (req, res, next) => {
  const db = mysql.createConnection({
    host: "remotemysql.com",
    user: "a2AVResZMP",
    password: "pOXXNddV6L",
    database: "a2AVResZMP",
    multipleStatements: true
  });

  // const db = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "lawyer"
  // });

  db.connect(err => {
    if (err) {
      throw err;
      res.json({ status: 0, message: "DB connection error" });
    }
  });

  console.log("Connected to database");

  global.db = db;
  next();
};

var checkUser = (req, res, next) => {
  if (req.url.includes("/account")) {
    console.log("In account url");

    var keys = ["lawyer_auth"];
    var cookies = new Cookies(req, res, { keys: keys });
    var clientLoggedIn = cookies.get("clientLoggedIn", { signed: true });
    var clientId = cookies.get("clientId", { signed: true });

    console.log("Clientlogged in " + clientLoggedIn);
    console.log("Clientid " + clientId);
  }

  console.log("In check user");
  next();
};

const closeConnection = (req, res, next) => {
  db.end(function(err) {
    console.log("connection is close now");
  });
};

app.use(connectToDB);

// app.use(checkUser);
app.use(auth.clientAuth);

app.use("/", appRoutes);
app.use("/api", apiRoutes);
app.use("/account", appRoutes);

app.use(closeConnection);

app.listen(port, function() {
  console.log("app running on port " + port);
});
