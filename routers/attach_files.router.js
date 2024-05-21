const express = require("express");
const router = express.Router();
const attachFileController = require("../controller/attach_files.controller");

router.post("/addAttachFile", attachFileController.addAttachFile);
router.get("/getAttachFiles", attachFileController.getAttachFiles);
router.delete("/deleteAttachFile", attachFileController.deleteAttachFile);
router.put("/changeStatus", attachFileController.chnageAttachFileStatus);

module.exports = router;
