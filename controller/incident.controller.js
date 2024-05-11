const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Incident = require("../model/incident.model");
const jwtController = require("./jwt.controller");

const userModule = require("../model/user.model");
const Notice = require("../model/notice.model");
const addIncident = async (req, res) => {
  console.log("called add incident");
  try {
    jwtController.verifyToken(req, res, () => {
      jwt.verify(req.token, "1234mmm", (err, authData) => {
        if (err) {
          console.log(err);
          res.status(403).json({
            error: "Forbidden",
          });
        } else {
          console.log("called add incident");
          console.log(req.body);
          const incident = new Incident({
            _id: new mongoose.Types.ObjectId(),
            lat: req.body.lat,
            long: req.body.long,
            description: req.body.description,
            locationName: req.body.locationName,
            userId: authData.id,
          });

          incident
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Incident added successfully",
                incident: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
const getIncidents = async (req, res) => {
  jwtController.verifyToken(req, res, () => {
    jwt.verify(req.token, "1234mmm", async (err, authData) => {
      if (err) {
        res.status(403).json({
          error: "Forbidden",
        });
      } else {
        try {
          const incidents = await Incident.find().populate("userId").exec();
          const incidentsWithUser = await Promise.all(
            incidents.map(async (incident) => {
              const user = await userModule.findOne({ _id: incident.userId });
              return {
                ...incident._doc,
                user: user, // Include user data within incident
              };
            })
          );
          res.status(200).json({
            incidents: incidentsWithUser,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            error: "Internal Server Error",
          });
        }
      }
    });
  });
};

const deleteIncident = async (req, res) => {
  jwtController.verifyToken(req, res, () => {
    jwt.verify(req.token, "1234mmm", (err, authData) => {
      if (err) {
        res.status(403).json({
          error: "Forbidden",
        });
      } else {
        Incident.findOneAndDelete({ _id: req.body.incidentId }).then(() => {
          res.status(200).json({
            message: "Incident deleted successfully",
          });
        });
      }
    });
  });
};

const changeIncidentStatus = async (req, res) => {
  jwtController.verifyToken(req, res, () => {
    jwt.verify(req.token, "1234mmm", (err, authData) => {
      if (err) {
        res.status(403).json({
          error: "Forbidden",
        });
      } else {
        Incident.findOneAndUpdate(
          { _id: req.body.incidentId },
          { status: req.body.status }
        )
          .then((incident) => {
            const notice = new Notice({
              _id: new mongoose.Types.ObjectId(),
              message: `Your Incident status updated to ${req.body.status}`,
              userId: incident.userId,
            });
            notice.save();
            res.status(200).json({
              message: "Incident status updated successfully",
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              error: "Internal Server Error",
            });
          });
      }
    });
  });
};

module.exports = {
  addIncident,
  getIncidents,
  deleteIncident,
  changeIncidentStatus,
};
