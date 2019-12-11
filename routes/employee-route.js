let router = require("express").Router();
const employeeController = require("../controller/admin/employee");

router.route("/employee").get(employeeController.index);

module.exports = router;
