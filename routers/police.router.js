const express = require("express");
const router = express.Router();
const policeContoller = require("../controller/police.controller");

router.get("/getPolice", policeContoller.getPolice);

router.post("/addPolice", policeContoller.addPolice);

module.exports = router;
