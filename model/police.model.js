const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const policeScheme = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: "string",
    required: true,
  },
});

const policeModel = db.model("police", policeScheme);

module.exports = policeModel;
