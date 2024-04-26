const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Incident = require("../model/incident.model");
const jwtController = require("./jwt.controller");

const addIncident = async (req, res) => {
  try {
    jwtController.verifyToken(req, res, () => {
      jwt.verify(req.token, "1234mmm", (err, authData) => {
        if (err) {
          console.log(err);
          res.status(403).json({
            error: "Forbidden",
          });
        } else {
          console.log(authData);
          const incident = new Incident({
            _id: new mongoose.Types.ObjectId(),
            lat: req.body.lat,
            long: req.body.long,
            description: req.body.description,
            locationName: req.body.locationName,
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
    jwt.verify(req.token, "1234mmm", (err, authData) => {
      if (err) {
        req.status(403).json({
          error: "Forbidden",
        });
      } else {
        Incident.find()
          .exec()
          .then((incidents) => {
            res.status(200).json(incidents);
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    });
  });
};

module.exports = { addIncident };
