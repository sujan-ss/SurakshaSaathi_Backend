const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const userSchema = new Schema({
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

  number: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  imageUrl: {
    type: "string",
  },
  passportImageUrl: {
    type: "string",
  },
  verified: {
    type: "boolean",
    default: false,
  },
});

const userModel = db.model("User", userSchema);

module.exports = userModel;
