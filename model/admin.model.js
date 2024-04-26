const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const adminModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    required: true,
  },

  type: {
    type: "string",
    required: true,
  },
});

const admin = db.model("Admin", adminModel);

module.exports = admin;
