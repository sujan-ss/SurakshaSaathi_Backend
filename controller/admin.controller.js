const adminService = require("../services/admin.services");

exports.adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if the admin exists in the database
    const admin = await adminService.getAdminByUsername(username);
    if (!admin) {
      return res.status(404).json({ status: false, error: "Admin not found" });
    }

    // Validate the password
    const isPasswordValid = await adminService.validatePassword(
      admin,
      password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ status: false, error: "Invalid password" });
    }

    // If username and password are valid, generate an authentication token
    const token = await adminService.generateAuthToken(admin);

    // Send the token in the response
    res.status(200).json({ status: true, token: token });
  } catch (error) {
    next(error);
  }
};
