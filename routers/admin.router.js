const express = require("express");
const router = express.Router();
const admincontroller = require("../controller/admin.controller");

router.post("/login", admincontroller.login);

module.exports = router;
