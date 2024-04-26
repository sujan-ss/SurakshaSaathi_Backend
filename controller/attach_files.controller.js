const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const AttachFile = require("../model/attach_files.model");
const jwtController = require("./jwt.controller");

const addAttachFile = async (req, res) => {
  console.log(req.body);

  try {
    jwtController.verifyToken(req, res, () => {
      jwt.verify(req.token, "1234mmm", (err, authData) => {
        if (err) {
          console.log(err);
          res.status(403).json({
            error: "Forbidden",
          });
        } else {
          const attachFile = new AttachFile({
            _id: new mongoose.Types.ObjectId(),
            photoUrl: req.body.photoUrl,
            audioUrl: req.body.audioUrl,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            user: authData.userId,
          });

          attachFile
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: "AttachFile added successfully",
                attachFile: result,
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
    console.log(e);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getAttachFiles = async (req, res) => {
  try {
    jwtController.verifyToken(req, res, () => {
      jwt.verify(req.token, "1234mmm", (err, authData) => {
        if (err) {
          console.log(err);
          res.status(403).json({
            error: "Forbidden",
          });
        } else {
          AttachFile.find()
            .populate("user", "firstName lastName email _id")
            .exec()
            .then((attachFiles) => {
              res.status(200).json({
                attachFiles: attachFiles,
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
    console.log(e);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = { addAttachFile, getAttachFiles };
