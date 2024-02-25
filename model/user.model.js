const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: "string",
    required: true,
  },
  lastname: {
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
  confirmpassword: {
    type: "string",
    required: true,
  },
});

userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);

    const hashpass = await bcrypt.hash(user.password, salt);

    const hashConfirmPass = await bcrypt.hash(user.confirmpassword, salt);

    user.password = hashpass;
    user.confirmpassword = hashConfirmPass;
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const userModel = db.model("User", userSchema);

module.exports = userModel;
