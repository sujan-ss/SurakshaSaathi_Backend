const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const incidentModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lat: {
    type: "string",
    required: true,
  },
  long: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  locationName: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    default: "pending",
  },
  police: {
    type: "String",
    default: "none",
  },
});

const incident = db.model("Incident", incidentModel);

module.exports = incident;
