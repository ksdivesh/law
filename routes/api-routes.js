let express = require("express");
let router = require("express").Router();
// const employeeController = require("../controller/admin/employee");
const employeeRoute = require("./employee-route");
const userRoute = require("./user-route");

router.get("/", function(req, res) {
  res.json({
    status: 1,
    message: "Welcome API is working!"
  });
});

router.route("/employee", router.use(employeeRoute));
router.route("/user", router.use(userRoute));

// router.route("/employee").get(employeeController.index);
module.exports = router;
