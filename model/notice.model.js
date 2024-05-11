const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const noticeScheme = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  message: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const noticeModel = db.model("notice", noticeScheme);

module.exports = noticeModel;
