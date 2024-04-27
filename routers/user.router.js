const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
router.get("/getUnverifiedUsers", userController.getUnverifiedUsers);
router.post("/verifyUser", userController.verifyUser);
router.get("/getUserProfile", userController.getUserProfile);
router.get("/getAllVerifiedUsers", userController.getAllVerifiedUsers);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router;
