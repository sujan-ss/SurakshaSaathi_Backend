const express = require("express");
const router = express.Router();
const noticeController = require("../controller/notice.controller");

router.get("/getNotice", noticeController.getNotice);

module.exports = router;
