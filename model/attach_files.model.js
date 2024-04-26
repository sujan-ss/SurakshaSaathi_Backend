const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const attachFileModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  photoUrl: {
    type: "string",
    required: true,
  },
  audioUrl: {
    type: "string",
    required: true,
  },
  videoUrl: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const AttachFile = db.model("AttachFile", attachFileModel);

module.exports = AttachFile;
