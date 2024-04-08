const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
