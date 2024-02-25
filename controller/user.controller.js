const userService = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, number, password, confirmpassword } =
      req.body;

    const successRes = await userService.registerUser(
      firstname,
      lastname,
      email,
      number,
      password,
      confirmpassword
    );

    res.json({ status: true, success: "User registered successfully" });
  } catch (error) {
    throw error;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.checkuser(email);

    if (!user) {
      throw new Error("User don't exist");
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch === false) {
      throw new Error("Password Invalid");
    }

    let tokenData = { _id: user._id, email: user.email };

    const token = await userService.generateToken(
      tokenData,
      "secretKey",
      "24h"
    );

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    throw error;
  }
};
