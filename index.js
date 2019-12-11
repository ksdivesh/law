let express = require("express");
let partials = require("express-partials");
let app = express();
const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");
const path = require("path");

let apiRoutes = require("./routes/api-routes");
let appRoutes = require("./routes/app-routes");

var port = 8000;

app.set("view engine", "ejs");
app.use(partials());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/", appRoutes);
app.use("/api", apiRoutes);

app.listen(port, function() {
  console.log("app running on port " + port);
});
