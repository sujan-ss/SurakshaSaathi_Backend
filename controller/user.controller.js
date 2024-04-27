const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtController = require("./jwt.controller");

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
  console.log("login");
  console.log(req.body.email);
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
              verified: user[0].verified,
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

const getUnverifiedUsers = async (req, res) => {
  try {
    // Call the verifyAdmin middleware function before executing the main logic
    jwtController.verifyAdmin(req, res, () => {
      // If the middleware passes, proceed with fetching unverified users
      User.find({ verified: false })
        .exec()
        .then((unverifiedUsers) => {
          res.status(200).json({
            users: unverifiedUsers,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: "Internal Server Error",
          });
        });
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const verifyUser = async (req, res) => {
  console.log("hetauda");
  try {
    jwtController.verifyAdmin(req, res, async () => {
      console.log("hetauda1");
      const userId = req.body.userId;
      console.log(userId);
      if (userId === undefined) {
        return res.status(400).json({
          error: "User ID is required",
        });
      }
      User.findOneAndUpdate({ _id: userId }, { verified: true }).then(() => {
        res.status(200).json({
          message: "User verified successfully",
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getAllVerifiedUsers = async (req, res) => {
  try {
    jwtController.verifyAdmin(req, res, () => {
      User.find({ verified: true })
        .exec()
        .then((verifiedUsers) => {
          res.status(200).json({
            users: verifiedUsers,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            error: "Internal Server Error",
          });
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    jwtController.verifyAdmin(req, res, () => {
      const userId = req.body.userId;
      console.log(userId);
      if (userId === undefined) {
        return res.status(400).json({
          error: "User ID is required",
        });
      }
      User.findOneAndDelete({ _id: userId }).then(() => {
        res.status(200).json({
          message: "User deleted successfully",
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getUserProfile = async (req, res) => {
  jwtController.verifyToken(req, res, () => {
    jwt.verify(req.token, "1234mmm", (err, authData) => {
      if (err) {
        res.status(403).json({
          error: "Forbidden",
        });
      } else {
        User.findById(authData.id)
          .exec()
          .then((user) => {
            res.status(200).json({
              user: user,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              error: "Internal Server Error",
            });
          });
      }
    });
  });
};

module.exports = {
  signUp,
  login,
  getUnverifiedUsers,
  verifyUser,
  getUserProfile,
  getAllVerifiedUsers,
  deleteUser,
};
