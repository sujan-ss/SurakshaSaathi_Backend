const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
router.get("/getUnverifiedUsers", userController.getUnverifiedUsers);
router.post("/verifyUser", userController.verifyUser);
router.get("/getUserProfile", userController.getUserProfile);

module.exports = router;
