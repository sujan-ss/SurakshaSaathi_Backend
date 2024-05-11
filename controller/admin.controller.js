const Admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const login = async (req, res) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length < 1) {
        return res.status(401).json({
          error: "Admin not exist",
        });
      } else {
        const token = jwt.sign(
          {
            id: admin[0]._id,
            email: admin[0].email,
            role: "admin",
          },
          "1234mmm",
          {
            expiresIn: "120h",
          }
        );
        res.status(200).json({
          message: "Login successfull",
          accessToken: token,
          role: admin[0].type,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = { login };
