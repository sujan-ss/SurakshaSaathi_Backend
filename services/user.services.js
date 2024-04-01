const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

class UserService {
  static async registerUser(
    firstname,
    lastname,
    email,
    number,
    password,
    confirmpassword,
    image // Add image parameter
  ) {
    try {
      const createUser = new userModel({
        firstname,
        lastname,
        email,
        number,
        password,
        confirmpassword,
        image: image ? image.path : null, // Save the image path in the database
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async checkUser(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(tokenData, secretKey, jwt_expire) {
    return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
  }

  static async getUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Error occurred while fetching user by email");
    }
  }
}

module.exports = UserService;
