let express = require("express");
let router = require("express").Router();

let homeController = require("../controller/Home");
let aboutController = require("../controller/About");
let registerController = require("../controller/Register");
let loginController = require("../controller/Login");
let lawyerController = require("../controller/Lawyer");
let lawyerDetailController = require("../controller/Lawyerdetail");
let serviceController = require("../controller/Service");
let stateController = require("../controller/State");

//account area

let accountDashbaordController = require("../controller/account/Dashboard");
let accountProfileController = require("../controller/account/Profile");
let accountLogoutController = require("../controller/account/Logout");
let accountChangePwdController = require("../controller/account/Changepwd");
let accountUserController = require("../controller/account/User");

//end

let adminDashboardController = require("../controller/admin/Dashboard");

router.get("/", homeController.index);
router.get("/index", homeController.index);
router.get("/home", homeController.index);
router.get("/about", aboutController.index);
router.get("/register", registerController.index);
router.post("/register/save", registerController.save);
router.get("/login", loginController.index);
router.post("/login/process", loginController.process);
router.get("/lawyer", lawyerController.index);
router.get("/lawyer-detail", lawyerDetailController.index);
router.get("/service", serviceController.index);
router.get("/state", stateController.index);
router.get("/state/cities/:id", stateController.cities);

//account area start

router.get("/account", accountDashbaordController.index);
router.get("/account/dashboard", accountDashbaordController.index);
router.get("/account/profile", accountProfileController.index);
router.post("/account/profile/process", accountProfileController.process);

router.get("/account/changepwd", accountChangePwdController.index);
router.get("/account/user", accountUserController.index);

router.get("/account/logout", accountLogoutController.index);

//end

router.get("/admin", adminDashboardController.index);
router.get("/admin/dashboard", adminDashboardController.index);

// router.route("/", router.use(homeController.index));
// router.route("/home", router.use(homeController.index));
// router.route("/index", router.use(homeController.index));
// router.route("/about", router.use(aboutController.index));

module.exports = router;
