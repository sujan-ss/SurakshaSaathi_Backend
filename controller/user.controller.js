const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const signUp = async (req, res) => {
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }

    // Ensure password is present in the request body
    if (!req.body.password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    let salt, hash;
    try {
      salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Failed to generate salt or hash password",
      });
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      number: req.body.number,
      imageUrl: req.body.imageUrl,
      passportImageUrl: req.body.passportImageUrl,
    });

    await user.save();

    res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          error: "User not exist",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (!result) {
            return res.status(401).json({
              error: "Invalid Password",
            });
          } else {
            const token = jwt.sign(
              {
                id: user[0]._id,
                email: user[0].email,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
              },
              "1234mmm",
              {
                expiresIn: "120h",
              }
            );
            res.status(200).json({
              message: "Login successfull",
              accessToken: token,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = { signUp, login };
