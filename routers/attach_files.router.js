const express = require("express");
const router = express.Router();
const attachFileController = require("../controller/attach_files.controller");

router.post("/addAttachFile", attachFileController.addAttachFile);
router.get("/getAttachFiles", attachFileController.getAttachFiles);

module.exports = router;
