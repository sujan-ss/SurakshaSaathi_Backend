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
