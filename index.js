let express = require("express");
let partials = require("express-partials");
let app = express();
var session = require("express-session"); 
const mysql = require("mysql");
const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");
const path = require("path");



let apiRoutes = require("./routes/api-routes");
let appRoutes = require("./routes/app-routes");

var port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(session({secret:'app',cookie:{maxAge:6000}, resave:true, saveUninitialized:true})); 

app.use(partials());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

const connectToDB = (req, res, next) => {
  const db = mysql.createConnection({
    host: "remotemysql.com",
    user: "a2AVResZMP",
    password: "pOXXNddV6L",
    database: "a2AVResZMP"
  });

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


var checkUser = (req,res,next)=>{

  console.log("Fresh sessin "); 
  console.log(req.session); 
  
  if(req.session.accountLoggedIn === true){
    next(); 
  }
  else{
    // res.render("login/index",{title:"Login"}); 
    res.redirect("/login"); 
  }
}


app.use(connectToDB);

app.use("/", appRoutes);
app.use("/api", apiRoutes);
app.use("/account",checkUser); 


app.listen(port, function() {
  
  console.log("app running on port " + port);
});
