const express = require("express");
const router = express.Router();
const incidentController = require("../controller/incident.controller");

router.post("/addIncident", incidentController.addIncident);
router.get("/getIncidents", incidentController.getIncidents);
router.delete("/deleteIncident", incidentController.deleteIncident);
router.put("/changeStatus", incidentController.changeIncidentStatus);
router.put("/assignPolice", incidentController.changePolice);

module.exports = router;
