const express = require("express");
const router = express.Router();
const incidentController = require("../controller/incident.controller");

router.post("/addIncident", incidentController.addIncident);

module.exports = router;
