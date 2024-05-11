const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtController = require("./jwt.controller");
const Notice = require("../model/notice.model");

const getNotice = async (req, res) => {
  jwtController.verifyToken(req, res, async (decoded) => {
    try {
      jwt.verify(req.token, "1234mmm", async (err, authData) => {
        const notices = await Notice.find({ userId: authData.id });
        //sort noice with created at
        notices.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        res.status(200).json({
          notices,
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  });
};
module.exports = { getNotice };
