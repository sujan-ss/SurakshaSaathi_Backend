const userModel = require("../model/user.model");

class userService {
  static async registerUser(
    firstname,
    lastname,
    email,
    number,
    password,
    confirmpassword
  ) {
    try {
      const createUser = new userModel({
        firstname,
        lastname,
        email,
        number,
        password,
        confirmpassword,
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = userService;
