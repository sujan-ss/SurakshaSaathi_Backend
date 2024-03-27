const userService = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, number, password, confirmpassword } =
      req.body;

    // Check if the email already exists in the database
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, error: "Email already exists" });
    }

    // If the email is unique, proceed with user registration
    const successRes = await userService.registerUser(
      firstname,
      lastname,
      email,
      number,
      password,
      confirmpassword
    );

    return res.json({ status: true, success: "User registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.checkUser(email);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch === false) {
      throw new Error("Password Invalid");
    }

    let tokenData = { _id: user._id, email: user.email };

    // Generate token without expiration
    const token = await userService.generateToken(tokenData, "secretKey");

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    next(error);
  }
};
