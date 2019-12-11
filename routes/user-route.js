let router = require("express").Router();
const userController = require("../controller/admin/user");

router.route("/user").get(userController.index);

module.exports = router;
