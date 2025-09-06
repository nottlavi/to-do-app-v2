const userModel = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, role } =
      req.body;

    //finding and returning response if user already exists
    const existingUser = userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "the user already exists",
      });
    }

    //checking if both the entered passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "entered password and confirm password do not match",
      });
    }

    // creating the new user here
    const newUser = await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role,
    });

    //printing the new user's data
    console.log(newUser);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
